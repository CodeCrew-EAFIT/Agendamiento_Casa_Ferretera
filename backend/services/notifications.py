from email.message import EmailMessage
import ssl
import smtplib
from services.user import getUserById, getAllUsersByRole, getSupervisorByLocation, getJefeDirectoByPromoter
from services.location import getLocationNameById
from models.booking import Booking

token = 'frog ehte jcuj itso'

def new_booking_notification_builder(promoter_id, booked_by_id,booking_data:Booking):
    booked_by_user = getUserById(booked_by_id)
    promoter_user = getUserById(promoter_id)
    jefe_directo = getJefeDirectoByPromoter(promoter_id)
    jefe_user = getUserById(jefe_directo[0])
    adminsUsers = getAllUsersByRole("administrador")
    location_name = getLocationNameById(booking_data.location_id)
    supervisorUser = getSupervisorByLocation(location_name)

    #Promotor
    subject1 = "Se te ha asignado una nueva promotoria"
    body1 = f"""Se te te ha asignado una nueva promotoria para el dia: {booking_data.booking_date}
    en la sede {location_name} de {booking_data.start_time} a {booking_data.end_time}"""
    send_notification_email(promoter_user.email, subject1, body1)
    
    
    #Jefe directo
    subject2 = "Nueva promotoria creada para uno de tus promotores"
    body2 = f"""Se ha agendado una nueva promotoria para {promoter_user.name} en {location_name}.
    la promotoria se llevara a cabo el dia {booking_data.booking_date} entre las {booking_data.start_time} y las {booking_data.end_time}
    el promotor seleccionado ya ha sido notificado"""
    send_notification_email(jefe_user.email, subject2, body2)
    
    
    #Supervisor
    subject3 = "Nueva promotoria creada en tu sede"
    body3 = f"""Se ha agendado una nueva promotoria en tus sedes. a continuación podras encontrar un poco mas de información.
    
    Información sobre la promotoria:
    - Fecha: {booking_data.booking_date}
    - Horario: de {booking_data.start_time} a {booking_data.end_time}

    Promotor responsable:
    - Nombre: {promoter_user.name}
    - Correo: {promoter_user.email}
    - Telefono: {promoter_user.phone_number}

    Promotoria agendada por:
    - Nombre: {booked_by_user.name}
    - Rol: {booked_by_user.role}
    - Correo: {booked_by_user.email}
    - Telefono: {booked_by_user.phone_number}
    el promotor seleccionado ya ha sido notificado"""
    send_notification_email(supervisorUser.email, subject3, body3)
        
        
    #Admin
    subject4 = "Nueva promotoria creada"
    body4 = f"""Se ha agendado una nueva promotoria dentro de casa ferretera. a continuación podras encontrar un poco mas de información.
    
    Información sobre la promotoria:
    - Fecha: {booking_data.booking_date}
    - Horario: de {booking_data.start_time} a {booking_data.end_time}

    Promotor responsable:
    - Nombre: {promoter_user.name}
    - Correo: {promoter_user.email}
    - Telefono: {promoter_user.phone_number}

    Promotoria agendada por:
    - Nombre: {booked_by_user.name}
    - Rol: {booked_by_user.role}
    - Correo: {booked_by_user.email}
    - Telefono: {booked_by_user.phone_number}
    el promotor seleccionado ya ha sido notificado"""
    
    for admin in adminsUsers:
        send_notification_email(admin.email, subject4, body4)


def modified_booking_notification_builder(promoter_id, booked_by_id,old_booking_data,new_booking_data, change_reason):
    booked_by_user = getUserById(booked_by_id)
    promoter_user = getUserById(promoter_id)
    jefe_directo = getJefeDirectoByPromoter(promoter_id)
    jefe_user = getUserById(jefe_directo[0])
    adminsUsers = getAllUsersByRole("administrador")
    location_name = getLocationNameById(old_booking_data[3])
    supervisorUser = getSupervisorByLocation(location_name)

    #Promotor
    subject1 = "Se ha modificado el horario de una de tus promotorias"
    body1 = f"""Fecha y hora anterior:
    - {old_booking_data[0]} de {old_booking_data[1]} a {old_booking_data[2]}
    
    Fecha y hora actual:
    - {new_booking_data[0]} de {new_booking_data[1]} a {new_booking_data[2]}
    
    Razones listadas para el cambio:
    {change_reason}
    """
    send_notification_email(promoter_user.email, subject1, body1)
    
    
    #Jefe directo
    subject2 = "Se ha modificado una promotoria asignada a uno de tus promotores"
    body2 = f"""Fecha y hora anterior:
    -  {old_booking_data[0]} de {old_booking_data[1]} a {old_booking_data[2]}
    
    Fecha y hora actual:
    - {new_booking_data[0]} de {new_booking_data[1]} a {new_booking_data[2]}

    Lugar:
    - {location_name}

    Cambio realizado por:
    - Nombre: {booked_by_user.name}
    - Correo: {booked_by_user.email}
    - Telefono: {booked_by_user.phone_number}
    
    Razones listadas para el cambio:
    {change_reason}
    """
    send_notification_email(jefe_user.email, subject2, body2)
    
    
    #Supervisor
    subject3 = "Una promotoria asignada a tu sede ha sido modificada"
    body3 = f"""Fecha y hora anterior:
    -  {old_booking_data[0]} de {old_booking_data[1]} a {old_booking_data[2]}
    
    Fecha y hora actual:
    - {new_booking_data[0]} de {new_booking_data[1]} a {new_booking_data[2]}

    Lugar:
    - {location_name}

    Cambio realizado por:
    - Nombre: {booked_by_user.name}
    - Correo: {booked_by_user.email}
    - Telefono: {booked_by_user.phone_number}
    
    Razones listadas para el cambio:
    {change_reason}
    """
    send_notification_email(supervisorUser.email, subject3, body3)
        
        
    #Admin
    subject4 = "Promotoria modificada"
    body4 = f"""Fecha y hora anterior:
    -  {old_booking_data[0]} de {old_booking_data[1]} a {old_booking_data[2]}
    
    Fecha y hora actual:
    - {new_booking_data[0]} de {new_booking_data[1]} a {new_booking_data[2]}

    Lugar:
    - {location_name}

    Cambio realizado por:
    - Nombre: {booked_by_user.name}
    - Correo: {booked_by_user.email}
    - Telefono: {booked_by_user.phone_number}
    
    Razones listadas para el cambio:
    {change_reason}
    """
    
    for admin in adminsUsers:
        send_notification_email(admin.email, subject4, body4)
        
def canceled_booking_notification_builder(promoter_id, booked_by_id,booking_data, change_reason): #Tipos: Nueva promotoria agendada: 1, promotoria modificada: 2, promotoria candelada: 3 
    booked_by_user = getUserById(booked_by_id)
    promoter_user = getUserById(promoter_id)
    jefe_directo = getJefeDirectoByPromoter(promoter_id)
    jefe_user = getUserById(jefe_directo[0])
    adminsUsers = getAllUsersByRole("administrador")
    location_name = getLocationNameById(booking_data[3])
    supervisorUser = getSupervisorByLocation(location_name)

    #Promotor
    subject1 = "Se ha cancelado una promotoria que te correspondia"
    body1 = f"""Fecha y hora de la promotoria cancelada:
    - {booking_data[0]} de {booking_data[1]} a {booking_data[2]}
    
    Razones listadas para el cambio:
    {change_reason}
    """
    send_notification_email(promoter_user.email, subject1, body1)
    
    
    #Jefe directo
    subject2 = "Una promotoria asignada a uno de tus promotores ha sido cancelada"
    body2 = f"""Fecha y hora de la promotoria cancelada:
    - {booking_data[0]} de {booking_data[1]} a {booking_data[2]}

    Lugar:
    - {location_name}

    Cambio realizado por:
    - Nombre: {booked_by_user.name}
    - Correo: {booked_by_user.email}
    - Telefono: {booked_by_user.phone_number}
    
    Razones listadas para el cambio:
    {change_reason}
    """
    send_notification_email(jefe_user.email, subject2, body2)
    
    
    #Supervisor
    subject3 = "Una promotoria de tu sede ha sido cancelada"
    body3 = f"""Fecha y hora de la promotoria cancelada:
    - {booking_data[0]} de {booking_data[1]} a {booking_data[2]}

    Lugar:
    - {location_name}

    Cambio realizado por:
    - Nombre: {booked_by_user.name}
    - Correo: {booked_by_user.email}
    - Telefono: {booked_by_user.phone_number}
    
    Razones listadas para el cambio:
    {change_reason}
    """
    send_notification_email(supervisorUser.email, subject3, body3)
        
        
    #Admin
    subject4 = "Promotoria cancelada"
    body4 = f"""Fecha y hora de la promotoria cancelada:
    - {booking_data[0]} de {booking_data[1]} a {booking_data[2]}

    Lugar:
    - {location_name}

    Cambio realizado por:
    - Nombre: {booked_by_user.name}
    - Correo: {booked_by_user.email}
    - Telefono: {booked_by_user.phone_number}
    
    Razones listadas para el cambio:
    {change_reason}
    """
    
    for admin in adminsUsers:
        send_notification_email(admin.email, subject4, body4)

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