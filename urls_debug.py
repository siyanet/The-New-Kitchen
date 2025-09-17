from django.urls import get_resolver

for url_pattern in get_resolver().url_patterns:
    print(url_pattern)
