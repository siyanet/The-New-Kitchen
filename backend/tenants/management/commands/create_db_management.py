# from django.db import connections
# from django.db.utils import ProgrammingError

# def create_tenant_database(db_name):
#     with connections['default'].cursor() as cursor:
#         try:
#             cursor.execute(f"CREATE DATABASE {db_name}")
#         except ProgrammingError:
#             pass  # Database already exists
