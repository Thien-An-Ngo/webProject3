# Generated by Django 3.0.7 on 2020-07-30 12:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0013_auto_20200729_1427'),
    ]

    operations = [
        migrations.RenameField(
            model_name='customer',
            old_name='user_id',
            new_name='user',
        ),
    ]
