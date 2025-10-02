
# FROM python:3.11-slim

# # Set work directory
# WORKDIR /code

# # Copy requirements and install
# COPY requirements.txt .
# RUN pip install --no-cache-dir -r requirements.txt

# # Copy backend source code
# COPY . .

# # Expose Django port
# EXPOSE 8000

# # Start backend server
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]


# FROM python:3.11-slim

# # Set environment variables
# ENV PYTHONDONTWRITEBYTECODE 1
# ENV PYTHONUNBUFFERED 1

# # Work directory
# WORKDIR /code

# # Install system dependencies
# RUN apt-get update && apt-get install -y \
#     libpq-dev gcc && \
#     pip install --upgrade pip

# # Install dependencies
# COPY requirements.txt /code/
# RUN pip install -r requirements.txt

# # Copy project
# COPY . /code/

# # Run as non-root user (optional, better security)
# RUN adduser --disabled-password appuser
# USER appuser

# CMD ["gunicorn", "the_kitchen_backend.wsgi:application", "--bind", "0.0.0.0:8000"]


# Base image
FROM python:3.11-slim

# Environment settings
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Workdir inside container
WORKDIR /code

# Install dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev gcc curl \
    && rm -rf /var/lib/apt/lists/*

# Install Python packages
COPY requirements.txt /code/
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy project
COPY . /code/

# Run migrations + start server
CMD python manage.py migrate_schemas --shared && \
    python manage.py migrate_schemas && \
    python manage.py collectstatic --noinput && \
    gunicorn the_kitchen_backend.wsgi:application --bind 0.0.0.0:$PORT
