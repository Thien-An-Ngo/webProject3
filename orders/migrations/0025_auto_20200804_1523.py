# Generated by Django 3.0.7 on 2020-08-04 15:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0024_auto_20200804_1503'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='is_delivered',
            field=models.BooleanField(default=False),
        ),
    ]
