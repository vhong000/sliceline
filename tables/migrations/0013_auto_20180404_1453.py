# Generated by Django 2.0.3 on 2018-04-04 14:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tables', '0012_auto_20180404_1446'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employees',
            name='id',
        ),
        migrations.AddField(
            model_name='employees',
            name='user_id',
            field=models.AutoField(default=1, primary_key=True, serialize=False),
            preserve_default=False,
        ),
    ]
