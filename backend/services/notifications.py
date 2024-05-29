from email.message import EmailMessage
import ssl
import smtplib
from services.user import getUserById

token = ''

def notification_builder(promoter_id, booked_by_id, notif_type): #Tipos: Nueva promotoria agendada: 1, promotoria modificada: 2, promotoria candelada: 3 
    promoter_user = getUserById(promoter_id)
    booked_by_user = getUserById(booked_by_id)

    if notif_type == 1:
        subject1 = "Nueva promotoria asignada para ti"
        body1 = "Se te ha asignado una nueva promotoria, Accede a la pagina para mas detalles"
        send_notification_email(promoter_user.email, subject1, body1)

        subject2 = "Nueva promotoria creada"
        body2 = """Has agendado una nueva promotoria.
        el promotor seleccionado ya ha sido notificado"""
        send_notification_email(booked_by_user.email, subject2, body2)
        
    elif notif_type == 2:
        subject1 = "Una promotoria asignada a ti ha sido modificada"
        body1 = """Se ha modificado una promotoria que te corresponde.
        Accede a la pagina para mas detalles"""
        send_notification_email(promoter_user.email, subject1, body1)

        subject2 = "Promotoria modificada"
        body2 = """Has modificado una promotoria.
        el promotor seleccionado ya ha sido notificado"""
        send_notification_email(booked_by_user.email, subject2, body2)
        
    elif notif_type == 3:
        subject1 = "Una promotoria asignada a ti ha sido cancelada"
        body1 = """Se ha cancelado una promotoria que te correspondia.
        Accede a la pagina para revisar tus horarios"""
        send_notification_email(promoter_user.email, subject1, body1)

        subject2 = "Promotoria cancelada"
        body2 = """Has cancelado una promotoria.
        el promotor seleccionado ya ha sido notificado"""
        send_notification_email(booked_by_user.email, subject2, body2)


def send_notification_email(receiver, subject, body): #Tipos: Nueva promotoria agendada: 1, promotoria modificada: 2, promotoria candelada: 3 
    sender = 'casaferretera.notif@gmail.com'

    em = EmailMessage()

    em['From'] = sender
    em['To'] = receiver
    em['Subject'] = subject
    em.set_content(body)

    context = ssl.create_default_context()

    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context = context) as smtp:
        smtp.login(sender, token)
        smtp.sendmail(sender, receiver, em.as_string())