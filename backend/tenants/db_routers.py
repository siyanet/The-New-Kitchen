import threading

# Thread-local storage to store current tenant info
_thread_locals = threading.local()

def set_current_tenant_db(db_name):
    _thread_locals.tenant_db = db_name

def get_current_tenant_db():
    return getattr(_thread_locals, 'tenant_db', 'default')


class TenantRouter:
    def db_for_read(self, model, **hints):
        if model._meta.app_label in ['restaurant', 'order', 'staff','items','users']:
            return get_current_tenant_db()  # function you define
        return 'default'

    def db_for_write(self, model, **hints):
        if model._meta.app_label in ['restaurant', 'order', 'staff']:
            return get_current_tenant_db()
        return 'default'

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label in ['restaurant', 'order', 'staff']:
            return db == get_current_tenant_db()
        return db == 'default'
