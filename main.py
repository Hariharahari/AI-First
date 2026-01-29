import streamlit as st
import streamlit.components.v1 as components
import os
import re
import time
import shutil
from io import BytesIO
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage

# --- CONFIGURATION ---
# Try to get key from Docker Env, otherwise load from secrets.toml (Hybrid approach for Cloud/Docker)
API_KEY = os.getenv("NVIDIA_API_KEY") or st.secrets["NVIDIA_API_KEY"]
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

# --- LIVE PREVIEW (STACKBLITZ) ---
# --- LIVE PREVIEW (STACKBLITZ) ---
def render_live_preview(project_name, file_contents):
    """
    🚀 Generates a button to open the project in StackBlitz (New Tab).
    """
    # 1. Boilerplate for Vite + React + Tailwind + HeroUI
    boilerplate = {
        "index.html": """<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI Preview</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>""",
        "package.json": """{
  "name": "ai-preview",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "@heroui/react": "^2.2.0",
    "framer-motion": "^10.16.4",
    "lucide-react": "^0.300.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",
    "zustand": "^4.5.0",
    "date-fns": "^3.3.1",
    "recharts": "^2.10.3",
    "react-hook-form": "^7.49.3",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5",
    "typescript": "^5.2.2",
    "vite": "^5.0.0"
  }
}""",
        "tailwind.config.js": """import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()]
}""",
        "postcss.config.js": """export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}""",
        "tsconfig.json": """{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}""",
        "tsconfig.node.json": """{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}""",
        "vite.config.ts": """import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})""",
        "src/main.tsx": """import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {NextUIProvider} from "@heroui/react";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <div className="w-screen h-screen bg-background text-foreground dark">
        <App />
      </div>
    </NextUIProvider>
  </React.StrictMode>,
)""",
        "src/index.css": """@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
}"""
    }

    # 2. Merge User Code into Boilerplate
    files = {**boilerplate, **file_contents}
    
    # 3. Construct HTML Form with a Manual Submit Button
    form_fields = ""
    for path, content in files.items():
        # Escape quotes for HTML
        safe_content = content.replace("&", "&amp;").replace('"', "&quot;").replace("<", "&lt;").replace(">", "&gt;")
        form_fields += f'<input type="hidden" name="project[files][{path}]" value="{safe_content}">'

    html = f"""
    <html>
    <head>
        <style>
            body {{
                background-color: #0e1117;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100px;
                margin: 0;
            }}
            .launch-btn {{
                background-color: #FF4B4B;
                color: white;
                font-family: sans-serif;
                font-size: 16px;
                font-weight: 600;
                padding: 12px 24px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                transition: background-color 0.2s;
                text-decoration: none;
                display: inline-block;
            }}
            .launch-btn:hover {{
                background-color: #FF2B2B;
            }}
        </style>
    </head>
    <body>
        <form action="https://stackblitz.com/run?file=src/App.tsx" method="post" target="_blank">
            <input type="hidden" name="project[title]" value="{project_name}">
            <input type="hidden" name="project[template]" value="node">
            <input type="hidden" name="project[description]" value="AI Generated Project">
            {form_fields}
            <button type="submit" class="launch-btn">
                🚀 Open "{project_name}" in New Tab
            </button>
        </form>
    </body>
    </html>
    """
    
    return components.html(html, height=150)

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
    coding_keywords = ["react", "code", "app", "website", "ui", "component", "button", "page", "fix", "debug", "create", "build", "style", "css", "api", "nav", "sidebar", "footer", "login", "dashboard", "typescript", "npm"]
    
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
    fixes = []
    chatter_pattern = r'\n\s*(?:\*\*|)(?:Summary|Rule Broken|Key Changes|Note|Update):.*$'
    if re.search(chatter_pattern, code, re.DOTALL | re.IGNORECASE):
        code = re.sub(chatter_pattern, '', code, flags=re.DOTALL | re.IGNORECASE)
        fixes.append("🧹 Cleaned conversational chatter from file footer")

    stripped = code.strip()
    if len(stripped) > 50 and stripped[-1].isalpha():
        last_brace = stripped.rfind('}')
        last_semi = stripped.rfind(';')
        cut_point = max(last_brace, last_semi)
        if cut_point > len(stripped) - 100: 
            code = stripped[:cut_point+1]
            fixes.append("✂️ Removed trailing garbage text after code end")
    return code, fixes

def validate_and_fix_code(filename, code, strict_mode=True):
    fixes_made = []
    code, scrub_fixes = clean_chatter_from_code(code)
    fixes_made.extend(scrub_fixes)

    if "CardContent" in code:
        code = code.replace("CardContent", "CardBody")
        fixes_made.append("⚡ Fixed: CardContent -> CardBody")
        
    if "City" in code and "lucide-react" in code:
        code = code.replace("City", "Building2")
        fixes_made.append("⚡ Fixed: City Icon -> Building2")
        
    if "import { City }" in code: code = code.replace("import { City }", "import { Building2 }")
    if ", City," in code: code = code.replace(", City,", ", Building2,")

    if "Typography" in code and "@heroicons/react" in code:
        code = code.replace("<Typography", "<div").replace("</Typography>", "</div>")
        code = re.sub(r'variant="[^"]*"', "", code)
        fixes_made.append("⚡ Fixed: Removed invalid Typography from HeroIcons")
    
    if not strict_mode: return code, fixes_made

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
    pattern = r'===FILE:\s*(.*?)\s*===\s*.*?(```(?:typescript|ts|tsx|javascript|js|jsx|css|json)?\n(.*?)```)'
    matches = re.findall(pattern, response_text, re.DOTALL)
    parsed_files = []
    
    if matches:
        for fname, full_block, code_content in matches:
            parsed_files.append((fname.strip(), code_content.strip()))
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
    tab_chat, tab_preview, tab_code, tab_brain = st.tabs(["💬 Architect Chat", "⚡ Live Preview", "📝 Code Viewer", "🧠 AI Brain"])

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

    with tab_preview:
        st.subheader("⚡ Live React Preview")
        st.caption("This runs your code in a browser-based container (StackBlitz). No local server needed.")
        
        if st.button("▶️ Launch Preview"):
            project_files = {}
            p_files = get_project_files(st.session_state.current_project)
            
            for f in p_files:
                content = read_file_content(st.session_state.current_project, f)
                # Map files to 'src/' if they are in the project root to match boilerplate
                clean_path = f if f.startswith("src/") else f"src/{f}"
                project_files[clean_path] = content
            
            render_live_preview(st.session_state.current_project, project_files)

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