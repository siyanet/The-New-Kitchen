import subprocess
from django.db import connection, connections
from django.conf import settings


def create_tenant_database_and_run_migrations(db_name):
    # Create the database
    with connection.cursor() as cursor:
        cursor.execute(f"CREATE DATABASE {db_name};")

    # Add dynamic DB config (optional, for immediate access)
    settings.DATABASES[db_name] = {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': db_name,
        'USER': settings.DATABASES['default']['USER'],
        'PASSWORD': settings.DATABASES['default']['PASSWORD'],
        'HOST': settings.DATABASES['default']['HOST'],
        'PORT': settings.DATABASES['default']['PORT'],
    }

    # Run migrations on the new database
    subprocess.run(["python", "manage.py", "migrate", "--database", db_name])



from django.conf import settings

def ensure_db_connection_exists(db_name):
    if db_name not in settings.DATABASES:
        settings.DATABASES[db_name] = {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': db_name,
            'USER': os.getenv('POSTGRES_USER'),
            'PASSWORD': os.getenv('POSTGRES_PASSWORD'),
            'HOST': os.getenv('POSTGRES_HOST'),
            'PORT': os.getenv('POSTGRES_PORT'),
        }
