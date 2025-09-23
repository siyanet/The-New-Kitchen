# Use Python image
FROM python:3.11-slim

# Set work directory
WORKDIR /code

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY . .

# Expose port (your Django default)
EXPOSE 8000

# Start backend server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

