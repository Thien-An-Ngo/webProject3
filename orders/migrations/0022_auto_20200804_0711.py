# Generated by Django 3.0.7 on 2020-08-04 07:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0021_auto_20200804_0658'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='order_date',
            new_name='order_datetime',
        ),
    ]