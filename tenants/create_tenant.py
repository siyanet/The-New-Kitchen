# import os
# import django

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'the_kitchen_backend.settings')
# django.setup()

# import psycopg2
# from django.conf import settings
# from django.core.management import call_command
# from django.db import connections
# from django.apps import apps
# from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
# from contextlib import closing
# from asgiref.sync import sync_to_async

# @sync_to_async
# def create_tenant_db(tenant, restaurant_data):
#     """
#     Creates a new tenant database, runs migrations (excluding 'tenants' app),
#     and creates a Restaurant entry in the new database.
#     """

#     # --- Step 1: Connect to default admin DB to create the new DB ---
#     try:
#         admin_conn = psycopg2.connect(
#             dbname='postgres',
#             user=settings.DATABASES['default']['USER'],
#             password=settings.DATABASES['default']['PASSWORD'],
#             host=settings.DATABASES['default']['HOST'],
#             port=settings.DATABASES['default']['PORT'],
#         )
#         admin_conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)

#         with admin_conn.cursor() as cursor:
#             cursor.execute(f'CREATE DATABASE "{tenant.db_name}";')
#             print(f"✅ Database '{tenant.db_name}' created.")
#     except psycopg2.errors.DuplicateDatabase:
#         print(f"⚠️ Database '{tenant.db_name}' already exists.")
#     except Exception as e:
#         print(f"❌ Error creating DB '{tenant.db_name}': {e}")
#     finally:
#         if admin_conn:
#             admin_conn.close()

#     # --- Step 2: Dynamically add tenant DB to Django settings ---
#     tenant_db_config = {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': tenant.db_name,
#         'USER': tenant.db_user,
#         'PASSWORD': tenant.db_password,
#         'HOST': tenant.db_host,
#         'PORT': tenant.db_port,
#         'CONN_MAX_AGE': 0,
#         'OPTIONS': {},
#         'ATOMIC_REQUESTS': True,
#     }
#     settings.DATABASES[tenant.db_name] = tenant_db_config

#     # --- Step 3: Run migrations EXCLUDING 'tenants' app ---
#     print(f"⚙️ Running migrations on '{tenant.db_name}'...")
#     for app_config in apps.get_app_configs():
#         if app_config.label != 'tenants':
#             try:
#                 print(f"➡️ Migrating app: {app_config.label}")
#                 call_command('migrate', app_config.label, database=tenant.db_name, verbosity=1)
#             except Exception as e:
#                 print(f"⚠️ Migration error in '{app_config.label}': {e}")
#     # --- Step 4: Create Restaurant entry in the new DB ---
#     try:
#         connections[tenant.db_name].ensure_connection()
#         Restaurant = apps.get_model('restaurant', 'Restaurant')

#         Restaurant.objects.using(tenant.db_name).create(
#             name=restaurant_data['name'],
#             description=restaurant_data.get('description', ''),
#             phone_number=restaurant_data['phone_number'],
#             email=restaurant_data['email'],
#             opening_time=restaurant_data['opening_time'],
#             closing_time=restaurant_data['closing_time'],
#         )
#         print(f"✅ Restaurant '{restaurant_data['name']}' created in DB '{tenant.db_name}'.")
#     except Exception as e:
#         print(f"❌ Error creating restaurant: {e}")
