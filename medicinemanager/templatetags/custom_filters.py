from django import template

register = template.Library()

@register.filter
def endswith(value: str, arg: str):
    return value.endswith(arg)


@register.filter
def get_widget_name(widget):
    return widget.__class__.__name__


@register.filter
def get_field(form, field_name):
    return form[field_name]
