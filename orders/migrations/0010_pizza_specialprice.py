# Generated by Django 3.0.7 on 2020-07-23 10:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0009_pizza'),
    ]

    operations = [
        migrations.AddField(
            model_name='pizza',
            name='specialPrice',
            field=models.FloatField(default=17.75),
            preserve_default=False,
        ),
    ]