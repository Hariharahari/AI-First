import streamlit as st
import os
import re
import time
import shutil
from io import BytesIO
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage

# --- CONFIGURATION ---
API_KEY = st.secrets["NVIDIA_API_KEY"]
BASE_URL = "https://integrate.api.nvidia.com/v1"
MODEL_ID = "mistralai/devstral-2-123b-instruct-2512"

PROJECT_ROOT = "generated-app"
SRC_DIR = os.path.join(PROJECT_ROOT, "src")
PROJECTS_DIR = os.path.join(SRC_DIR, "projects")

# --- PAGE SETUP & CUSTOM CSS ---
st.set_page_config(page_title="AI React Architect", layout="wide", page_icon="🧠")

st.markdown("""
<style>
    .stApp { background-color: #0e1117; }
    
    /* QA Log Styling */
    .qa-report {
        background-color: #161b22;
        border: 1px solid #30363d;
        border-radius: 6px;
        padding: 10px;
        margin-top: 10px;
        font-family: monospace;
        font-size: 0.85rem;
    }
    .qa-success { color: #3fb950; }
    .qa-warning { color: #d2a106; }
    .qa-error { color: #f85149; }
    
    .stTabs [data-baseweb="tab-list"] { gap: 24px; }
    .stTabs [data-baseweb="tab"] { height: 50px; background-color: transparent; }
    .stTabs [aria-selected="true"] { color: #58a6ff; border-bottom: 2px solid #58a6ff; }
    
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
</style>
""", unsafe_allow_html=True)

# --- SESSION STATE ---
if "history" not in st.session_state: st.session_state.history = []
if "current_project" not in st.session_state: st.session_state.current_project = ""
if "selected_file_content" not in st.session_state: st.session_state.selected_file_content = ""
if "active_file" not in st.session_state: st.session_state.active_file = None
if "learned_rules" not in st.session_state: st.session_state.learned_rules = set()

# --- CLIENT ---
@st.cache_resource
def get_llm():
    return ChatOpenAI(
        model=MODEL_ID,
        openai_api_key=API_KEY,
        openai_api_base=BASE_URL,
        temperature=0.3, 
        model_kwargs={"max_tokens": 4096}, 
        streaming=True
    )

llm = get_llm()

# --- GUARDRAILS (WEEK 9 SAFETY LAYER) ---
def input_guardrail(prompt):
    """
    🛡️ SAFETY LAYER: Blocks malicious content and strictly enforces coding topics.
    """
    # 1. Deny List: Topics strictly forbidden (Injection Defense & Safety)
    forbidden_terms = ["hack", "exploit", "bomb", "kill", "suicide", "politics", "finance advice", "medical advice", "password steal"]
    if any(term in prompt.lower() for term in forbidden_terms):
        return False, "🚫 **Security Block:** I cannot discuss that topic."

    # 2. Topic Check: Must be relevant to the Agent's purpose (Web Dev)
    # We allow short prompts like "fix it" or "make it blue", but long prompts MUST mention coding terms.
    coding_keywords = ["react", "code", "app", "website", "ui", "component", "button", "page", "fix", "debug", "create", "build", "style", "css", "api", "nav", "sidebar", "footer", "login", "dashboard", "typescript", "npm"]
    
    # If prompt is long (> 5 words) and has NO coding keywords, flag it as off-topic.
    if len(prompt.split()) > 5 and not any(kw in prompt.lower() for kw in coding_keywords):
        return False, "⚠️ **Off-Topic:** I am a React Architect. Please ask about web development, UI, or coding."

    return True, "Safe"

# --- FILE OPERATIONS ---
def sanitize_filename(name):
    clean = re.sub(r'[^a-zA-Z0-9_-]', '', name)
    return clean if clean else "UntitledProject"

def get_project_files(project_name):
    target_dir = os.path.join(PROJECTS_DIR, project_name)
    file_list = []
    if not os.path.exists(target_dir): return []
    for root, _, files in os.walk(target_dir):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.jsx', '.js', '.css', '.json')):
                rel_path = os.path.relpath(os.path.join(root, file), target_dir)
                file_list.append(rel_path.replace("\\", "/"))
    return sorted(file_list)

def read_file_content(project_name, relative_path):
    full_path = os.path.join(PROJECTS_DIR, project_name, relative_path)
    if os.path.exists(full_path):
        with open(full_path, "r", encoding="utf-8") as f:
            return f.read()
    return "// Error reading file"

def save_file(filepath, content):
    try:
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        return True, f"📄 Saved: {filepath}"
    except Exception as e:
        return False, f"❌ Error saving {filepath}: {e}"

def zip_project(project_name):
    project_path = os.path.join(PROJECTS_DIR, project_name)
    if not os.path.exists(project_path): return None
    buffer = BytesIO()
    shutil.make_archive(base_name=os.path.join(SRC_DIR, "temp_zip"), format='zip', root_dir=project_path)
    with open(os.path.join(SRC_DIR, "temp_zip.zip"), "rb") as f:
        buffer.write(f.read())
    buffer.seek(0)
    return buffer

def update_root_entry_point(project_name):
    project_path = os.path.join(PROJECTS_DIR, project_name)
    if not os.path.exists(project_path): return False, f"⚠️ Project folder '{project_name}' not found."
    import_path = ""
    if os.path.exists(os.path.join(project_path, "App.tsx")): import_path = f"./projects/{project_name}/App"
    elif os.path.exists(os.path.join(project_path, "app", "App.tsx")): import_path = f"./projects/{project_name}/app/App"
    elif os.path.exists(os.path.join(project_path, "src", "App.tsx")): import_path = f"./projects/{project_name}/src/App"
    else:
        found = False
        for root, dirs, files in os.walk(project_path):
            if "App.tsx" in files:
                abs_file_path = os.path.join(root, "App")
                rel_path = os.path.relpath(abs_file_path, SRC_DIR)
                import_path = "./" + rel_path.replace("\\", "/")
                found = True
                break
        if not found: return False, f"⚠️ Critical: Could not find any 'App.tsx' inside {project_name}."

    timestamp = int(time.time())
    switchboard_code = f"""
import React from 'react';
import ProjectApp from '{import_path}';
// Auto-generated by AI Architect | Linked at: {timestamp}
export default function App() {{ return (<div className="App"><ProjectApp /></div>); }}
"""
    main_app_path = os.path.join(SRC_DIR, "App.tsx")
    success, msg = save_file(main_app_path, switchboard_code)
    return (True, f"🔗 ACTIVATED: {project_name}") if success else (False, msg)

# --- ADVANCED QA LAYER ---
def clean_chatter_from_code(code):
    """
    Removes 'Summary of changes', 'Rule Broken', and other conversational text 
    that might be appended to the file.
    """
    fixes = []
    
    # 1. Remove "Rule Broken" or "Summary:" lines at the end
    # Regex looks for: Newline + (Summary|Rule|Note|Changes): + anything until end
    chatter_pattern = r'\n\s*(?:\*\*|)(?:Summary|Rule Broken|Key Changes|Note|Update):.*$'
    if re.search(chatter_pattern, code, re.DOTALL | re.IGNORECASE):
        code = re.sub(chatter_pattern, '', code, flags=re.DOTALL | re.IGNORECASE)
        fixes.append("🧹 Cleaned conversational chatter from file footer")

    # 2. Safety Net: If TypeScript file, ensure it ends with } or ;
    # If the last character is a letter, it's likely garbage text.
    stripped = code.strip()
    if len(stripped) > 50 and stripped[-1].isalpha():
        # Find the last occurrence of '}' or ';' and cut everything after it
        last_brace = stripped.rfind('}')
        last_semi = stripped.rfind(';')
        cut_point = max(last_brace, last_semi)
        
        if cut_point > len(stripped) - 100: # Only cut if it's near the end
            code = stripped[:cut_point+1]
            fixes.append("✂️ Removed trailing garbage text after code end")

    return code, fixes

def validate_and_fix_code(filename, code, strict_mode=True):
    fixes_made = []
    
    # STEP 1: SCRUBBER (Remove Chat Text)
    code, scrub_fixes = clean_chatter_from_code(code)
    fixes_made.extend(scrub_fixes)

    # STEP 2: INSTANT FIXES (Regex)
    # HeroUI Updates
    if "CardContent" in code:
        code = code.replace("CardContent", "CardBody")
        fixes_made.append("⚡ Fixed: CardContent -> CardBody")
        
    # Lucide Updates
    if "City" in code and "lucide-react" in code:
        code = code.replace("City", "Building2")
        fixes_made.append("⚡ Fixed: City Icon -> Building2")
        
    if "import { City }" in code: code = code.replace("import { City }", "import { Building2 }")
    if ", City," in code: code = code.replace(", City,", ", Building2,")

    # HeroIcons cleanup
    if "Typography" in code and "@heroicons/react" in code:
        code = code.replace("<Typography", "<div").replace("</Typography>", "</div>")
        code = re.sub(r'variant="[^"]*"', "", code)
        fixes_made.append("⚡ Fixed: Removed invalid Typography from HeroIcons")
    
    if not strict_mode: return code, fixes_made

    # STEP 3: DEEP SCAN (LLM) if necessary
    needs_deep_scan = False
    if "export default" not in code and ".tsx" in filename: needs_deep_scan = True
    if "CardTitle" in code or "CardDescription" in code: needs_deep_scan = True
    
    if not needs_deep_scan: return code, fixes_made

    qa_prompt = f"""
    You are a Code Fixer.
    TASK: Fix this file '{filename}'.
    ISSUES:
    1. HeroUI: 'CardTitle'/'CardDescription' do not exist -> Use <h3>/<p>.
    2. React: Ensure 'export default' exists.
    INPUT CODE:
    ```tsx
    {code}
    ```
    OUTPUT: Return ONLY the corrected code block.
    """
    messages = [HumanMessage(content=qa_prompt)]
    try:
        response = llm.invoke(messages)
        content = response.content
        match = re.search(r'```(?:typescript|ts|tsx|javascript|js|jsx)?\n(.*?)```', content, re.DOTALL)
        corrected_code = match.group(1) if match else content
        
        if "CardTitle" in code and "CardTitle" not in corrected_code:
            fixes_made.append("🧠 Deep Fix: Converted 'CardTitle' to HTML tags")
        return corrected_code.strip(), fixes_made
    except Exception as e:
        return code, fixes_made + [f"QA Error: {e}"]

def parse_and_save_files(response_text, target_dir):
    logs = []
    
    # --- STRICT REGEX PARSING ---
    # Finds ===FILE: name=== then scans for the code block.
    # It stops EXACTLY at the closing ``` tag.
    # This prevents capturing text after the code block.
    pattern = r'===FILE:\s*(.*?)\s*===\s*.*?(```(?:typescript|ts|tsx|javascript|js|jsx|css|json)?\n(.*?)```)'
    
    matches = re.findall(pattern, response_text, re.DOTALL)
    
    parsed_files = []
    
    if matches:
        for fname, full_block, code_content in matches:
            parsed_files.append((fname.strip(), code_content.strip()))
            
    # Fallback for active file editing (if no file header used)
    elif st.session_state.active_file:
         code_match = re.search(r'```(?:typescript|ts|tsx|javascript|js|jsx)?\n(.*?)```', response_text, re.DOTALL)
         if code_match:
             logs.append(f"⚠️ Auto-Assigning code to active file: {st.session_state.active_file}")
             parsed_files.append((st.session_state.active_file, code_match.group(1).strip()))

    if not parsed_files:
        logs.append("❌ NO FILES FOUND in AI response.")
        return False, logs

    os.makedirs(target_dir, exist_ok=True)
    project_name = os.path.basename(target_dir)
    files_saved_count = 0

    for filename, code in parsed_files:
        clean_filename = filename.strip().replace("\\", "/")
        if f"{project_name}/" in clean_filename: 
            clean_filename = clean_filename.split(f"{project_name}/")[-1] 
        clean_filename = re.sub(r'^(src/|projects/|generated-app/|app/)', '', clean_filename, flags=re.IGNORECASE).lstrip("/")
        
        # --- RUN ADVANCED QA ---
        final_code, fixes = validate_and_fix_code(clean_filename, code)
        
        if fixes:
            for fix in fixes: 
                css_class = "fix-log" if "Deep" in fix else "qa-log" 
                logs.append(f"<div class='{css_class}'>{fix}</div>")

        full_path = os.path.join(target_dir, clean_filename)
        success, msg = save_file(full_path, final_code)
        
        if success: 
            files_saved_count += 1
            if not fixes: logs.append(msg)
            else: logs.append(f"✅ Saved Corrected: {clean_filename}")

    return files_saved_count > 0, logs

# --- QA AGENT ---
def run_qa_agent(project_name):
    files = get_project_files(project_name)
    all_code_context = ""
    for f in files:
        content = read_file_content(project_name, f)
        all_code_context += f"\n===FILE: {f}===\n{content}\n"
    
    qa_prompt = f"""
    ACT AS A LEAD QA ENGINEER.
    CONTEXT: {all_code_context}
    TASK: Fix errors and REPORT what rule was broken.
    CHECKLIST:
    1. **Exports:** `App.tsx` MUST use `export default function App`.
    2. **Cleanup:** Remove any text summaries appearing at the end of files.
    OUTPUT FORMAT: ===FILE: path/filename.tsx===
    """
    messages = [HumanMessage(content=qa_prompt)]
    resp_content = ""
    for chunk in llm.stream(messages): resp_content += chunk.content
    
    if "export default" in resp_content: st.session_state.learned_rules.add("ROOT App.tsx MUST USE 'export default'")
    
    target_dir = os.path.join(PROJECTS_DIR, project_name)
    success, logs = parse_and_save_files(resp_content, target_dir)
    return success, logs

# --- SIDEBAR CONTROL CENTER ---
with st.sidebar:
    st.header("🎛️ Control Center")
    
    if st.session_state.current_project:
        files = get_project_files(st.session_state.current_project)
        c1, c2 = st.columns(2)
        c1.metric("Files", len(files))
        c2.metric("Brain IQ", len(st.session_state.learned_rules))
        
        st.divider()
        st.subheader("📂 File Navigation")
        selected_file_nav = st.selectbox("Jump to file:", options=["Select a file..."] + files, index=0)
        if selected_file_nav != "Select a file...":
            st.session_state.active_file = selected_file_nav
            st.session_state.selected_file_content = read_file_content(st.session_state.current_project, selected_file_nav)
        
        st.write("---")
        zip_buffer = zip_project(st.session_state.current_project)
        if zip_buffer:
            st.download_button("📥 Download Project (.zip)", zip_buffer, file_name=f"{st.session_state.current_project}.zip", mime="application/zip", use_container_width=True)
        st.divider()

    mode = st.radio("Mode", ["Create New", "Load / Edit", "🛡️ Run QA"])
    
    if mode == "Create New":
        st.subheader("New Project")
        p_name = st.text_input("Name", placeholder="e.g. Medipulse")
        p_reqs = st.text_area("Requirements", height=100)
        
        if st.button("🚀 Build", type="primary"):
            # 🛑 GUARDRAIL CHECK 1 (Initial Build)
            is_safe, denial_msg = input_guardrail(p_reqs)
            
            if not is_safe:
                st.error(denial_msg)
            elif p_name and p_reqs:
                safe_name = sanitize_filename(p_name)
                st.session_state.current_project = safe_name
                st.session_state.history = []
                target_dir = os.path.join(PROJECTS_DIR, safe_name)
                
                with st.status(f"Building '{safe_name}'...", expanded=True) as status:
                    learned_context = "\n".join([f"- {r}" for r in st.session_state.learned_rules])
                    system_text = f"You are a Senior React Engineer.\nGOAL: Build '{p_reqs}'\nRULES:\n1. Use @heroui/react ONLY.\n2. OUTPUT FULL FILES: ===FILE: path.tsx===\n3. DO NOT ADD SUMMARIES TO THE FILE CONTENT.\nAVOID:\n{learned_context}"
                    messages = [SystemMessage(content=system_text), HumanMessage(content="Start build.")]
                    
                    resp_content = ""
                    cont = st.empty()
                    for chunk in llm.stream(messages): resp_content += chunk.content; cont.markdown(resp_content + "▌")
                    cont.markdown(resp_content)
                    
                    success, logs = parse_and_save_files(resp_content, target_dir)
                    st.session_state.history = messages
                    st.session_state.history.append(AIMessage(content=resp_content))
                    
                    if success:
                        update_root_entry_point(safe_name)
                        st.write("🛡️ Running QA...")
                        run_qa_agent(safe_name)
                        status.update(label="Build Complete", state="complete")
                        st.rerun()

    elif mode == "Load / Edit":
        st.subheader("Load Project")
        if os.path.exists(PROJECTS_DIR):
            projects = [d for d in os.listdir(PROJECTS_DIR) if os.path.isdir(os.path.join(PROJECTS_DIR, d))]
            selected = st.selectbox("Project", projects)
            if st.button("📂 Load", type="primary"):
                st.session_state.current_project = selected
                st.session_state.history = []
                st.session_state.active_file = None
                update_root_entry_point(selected)
                st.rerun()
    
    elif mode == "🛡️ Run QA":
        if st.session_state.current_project:
            if st.button("🛡️ Run Scan"):
                with st.status("Scanning..."):
                    run_qa_agent(st.session_state.current_project)
                    st.success("Done.")

# --- MAIN WORKSPACE ---
if st.session_state.current_project:
    st.title(f"🚀 {st.session_state.current_project}")
    tab_chat, tab_code, tab_brain = st.tabs(["💬 Architect Chat", "📝 Code Viewer", "🧠 AI Brain"])

    with tab_chat:
        for msg in st.session_state.history:
            if isinstance(msg, HumanMessage) and "Start build." not in msg.content:
                with st.chat_message("user", avatar="🧑‍💻"): st.write(msg.content)
            elif isinstance(msg, AIMessage):
                with st.chat_message("assistant", avatar="🤖"): 
                    if "🛡️ Quality Assurance Report" in msg.content:
                        st.markdown(f"<div class='qa-report'>{msg.content}</div>", unsafe_allow_html=True)
                    else:
                        with st.expander("View Code & Details", expanded=False): 
                            st.markdown(msg.content)

        if feedback := st.chat_input("Instruction..."):
            # 🛑 GUARDRAIL CHECK 2 (Chat Interface)
            is_safe, denial_msg = input_guardrail(feedback)
            
            with st.chat_message("user", avatar="🧑‍💻"): st.write(feedback)
            
            if not is_safe:
                 with st.chat_message("assistant", avatar="🤖"):
                     st.error(denial_msg)
            else:
                with st.chat_message("assistant", avatar="🤖"):
                    with st.status("🔧 Architect Working...", expanded=True) as status:
                        context_msg = ""
                        if st.session_state.active_file:
                            context_msg = f"Reading `{st.session_state.active_file}`:\n```tsx\n{st.session_state.selected_file_content}\n```"
                        
                        learned_context = "\n".join([f"- {r}" for r in st.session_state.learned_rules])
                        prompt = f"ACT AS A SENIOR ENGINEER.\nCONTEXT: {context_msg}\nREQ: {feedback}\nRULES:\n1. FULL FILE CONTENT ONLY.\n2. USE @heroui/react.\n3. NO SUMMARIES INSIDE CODE BLOCKS.\nAVOID:\n{learned_context}\nFORMAT: ===FILE: path.tsx==="
                        st.session_state.history.append(HumanMessage(content=prompt))
                        
                        resp_content = ""
                        cont = st.empty()
                        for chunk in llm.stream(st.session_state.history): resp_content += chunk.content; cont.markdown(resp_content + "▌")
                        cont.markdown(resp_content)
                        
                        target_dir = os.path.join(PROJECTS_DIR, st.session_state.current_project)
                        success, logs = parse_and_save_files(resp_content, target_dir)
                        
                        st.session_state.history.append(AIMessage(content=resp_content))
                        
                        if success:
                            st.write("🛡️ QA Checking...")
                            qa_success, qa_logs = run_qa_agent(st.session_state.current_project)
                            
                            qa_report = "**🛡️ Quality Assurance Report**\n\n"
                            if logs:
                                qa_report += "**💾 File Operations:**\n"
                                for log in logs: qa_report += f"- {log}\n"
                            if qa_logs:
                                qa_report += "\n**🐛 QA Fixes Applied:**\n"
                                for log in qa_logs: qa_report += f"- {log}\n"
                            else:
                                qa_report += "\n✅ QA passed. No structural errors found."
                            
                            st.session_state.history.append(AIMessage(content=qa_report))
                            
                            status.update(label="Done", state="complete")
                            time.sleep(1)
                            st.rerun()

    with tab_code:
        if st.session_state.active_file:
            st.info(f"Editing: {st.session_state.active_file}")
            st.code(st.session_state.selected_file_content, language="typescript", line_numbers=True)
        else:
            st.caption("👈 Select a file from the sidebar dropdown to view code.")

    with tab_brain:
        st.subheader("🎓 Learned Rules")
        if st.session_state.learned_rules:
            for rule in st.session_state.learned_rules: st.success(f"Verified Rule: {rule}")
        else:
            st.info("No rules learned yet.")
else:
    st.info("👈 Select or Create a project in the Sidebar to begin.")