# 1. Base Image: Lightweight Python
FROM python:3.11-slim

# 2. Setup Workspace
WORKDIR /app

# 3. Install Dependencies
# We copy requirements first to use Docker caching (makes rebuilds faster)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. Copy the Application Code
COPY . .

# 5. Network Setup
# Streamlit runs on 8501 by default
EXPOSE 8501

# 6. Start Command
# We bind to 0.0.0.0 so the browser on your laptop can see the container
CMD ["streamlit", "run", "app.py", "--server.port=8501", "--server.address=0.0.0.0"]