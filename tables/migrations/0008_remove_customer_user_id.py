# Generated by Django 2.0.3 on 2018-04-04 03:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tables', '0007_auto_20180404_0314'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customer',
            name='user_id',
        ),
    ]
