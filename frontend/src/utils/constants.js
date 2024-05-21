export const API_URL = 'http://127.0.0.1:8000'

export const PROMOTER_BRAND = 'dewalt'

export const PROMOTER_USER = {
  name: 'Promoter1',
  role: 'promotor',
  email: 'promoter1@gmail.com',
  brand: 'dewalt',
  user_id: 11,
  hashed_password: 'Promoter1*',
  phone_number: '1212121212'
}

export const USER_ROLES = [
  'Promotor',
  'Jefe directo'
]

export const ADMIN = 'Administrador'
export const SUPERVISOR = 'Supervisor'
export const PROMOTER = 'Promotor'
export const CHIEF = 'Jefe directo'

export const USER_TYPES = [ADMIN, SUPERVISOR, PROMOTER, CHIEF]

export const ADMIN_USERS = [ADMIN, CHIEF]
export const BLOCK_USERS = [ADMIN, SUPERVISOR]

export const USER_TO_NAME = {
  [ADMIN]: 'Admin',
  [SUPERVISOR]: 'Amador',
  [CHIEF]: 'Dewalt',
  [PROMOTER]: 'Promotor Dewalt'
}

export const AVAILABLE_HOURS = [
  '7:00 AM',
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM'
]

export const AVAILABLE_HOURS_SPECIFIC = [
  '7:00 AM',
  '7:30 AM',
  '8:00 AM',
  '8:30 AM',
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
  '4:30 PM',
  '5:00 PM',
  '5:30 PM',
  '6:00 PM'
]

export const AVAILABLE_HOURS_MILITARY = {
  '7:00 AM': '07:00',
  '7:30 AM': '07:30',
  '8:00 AM': '08:00',
  '8:30 AM': '08:30',
  '9:00 AM': '09:00',
  '9:30 AM': '09:30',
  '10:00 AM': '10:00',
  '10:30 AM': '10:30',
  '11:00 AM': '11:00',
  '11:30 AM': '11:30',
  '12:00 PM': '12:00',
  '12:30 PM': '12:30',
  '1:00 PM': '13:00',
  '1:30 PM': '13:30',
  '2:00 PM': '14:00',
  '2:30 PM': '14:30',
  '3:00 PM': '15:00',
  '3:30 PM': '15:30',
  '4:00 PM': '16:00',
  '4:30 PM': '16:30',
  '5:00 PM': '17:00',
  '5:30 PM': '17:30',
  '6:00 PM': '18:00'
}

export const AVAILABLE_HOURS_MILITARY_ARRAY = [
  '07:00:00',
  '07:30:00',
  '08:00:00',
  '08:30:00',
  '09:00:00',
  '09:30:00',
  '10:00:00',
  '10:30:00',
  '11:00:00',
  '11:30:00',
  '12:00:00',
  '12:30:00',
  '13:00:00',
  '13:30:00',
  '14:00:00',
  '14:30:00',
  '15:00:00',
  '15:30:00',
  '16:00:00',
  '16:30:00',
  '17:00:00',
  '17:30:00',
  '18:00:00'
]

export const AVAILABLE_HOURS_SIMPLIFIED = [
  '7 AM',
  '8 AM',
  '9 AM',
  '10 AM',
  '11 AM',
  '12 PM',
  '1 PM',
  '2 PM',
  '3 PM',
  '4 PM',
  '5 PM',
  '6 PM'
]

export const AVAILABLE_LOCATIONS_ARRAY = [
  'Amador',
  'América',
  'Apartadó',
  'Centro',
  'Envigado',
  'Itagüí',
  'La Ceja',
  'Palacé',
  'Rionegro'
]

export const AVAILABLE_LOCATIONS_DICT = {
  amador: 'Amador',
  america: 'América',
  apartado: 'Apartadó',
  centro: 'Centro',
  envigado: 'Envigado',
  itagui: 'Itagüí',
  laceja: 'La Ceja',
  palace: 'Palacé',
  rionegro: 'Rionegro'
}

export const AVAILABLE_LOCATIONS_PATH_DICT = {
  Amador: 'amador',
  América: 'america',
  Apartadó: 'apartado',
  Centro: 'centro',
  Envigado: 'envigado',
  Itagüí: 'itagui',
  'La Ceja': 'laceja',
  Palacé: 'palace',
  Rionegro: 'rionegro'
}

export const AVAILABLE_LOCATIONS_TO_ID = {
  Amador: 1,
  América: 2,
  Palacé: 3,
  Centro: 4,
  Itagüí: 5,
  Envigado: 6,
  Rionegro: 7,
  'La Ceja': 8,
  Apartadó: 9
}

export const ID_TO_AVAILABLE_LOCATIONS = {
  1: 'Amador',
  2: 'América',
  3: 'Palacé',
  4: 'Centro',
  5: 'Itagüí',
  6: 'Envigado',
  7: 'Rionegro',
  8: 'La Ceja',
  9: 'Apartadó'
}

export const MULTIPLE_PROMOTIONS_LOCATIONS = ['Palacé']

export const AVAILABLE_BRANDS_ARRAY = [
  'Dewalt',
  'Black+Decker'
]

export const BRAND_TO_LOWERCASE = {
  Dewalt: 'dewalt',
  'Black+Decker': 'black+decker'
}

export const BRAND_TO_ID = {
  casaferretera: 1,
  dewalt: 2,
  'black+decker': 3
}

export const ID_TO_BRAND_LOWERCASE = {
  1: 'casaferretera',
  2: 'dewalt',
  3: 'black+decker'
}

export const ID_TO_BRAND = {
  0: 'XXXXXXXX',
  1: 'Casa Ferretera',
  2: 'Dewalt',
  3: 'Black+Decker'
}

export const INPUT_PLACEHOLDERS = {
  location: 'Seleccione la sede',
  date: 'Fecha',
  startTime: 'Hora inicio',
  endTime: 'Hora final',
  promoter: 'Promotor',
  reason: 'Seleccione la opción más adecuada',
  role: 'Escoja el tipo de usuario que se quiere crear',
  store: 'Escoja la tienda donde trabaja el usuario'
}

export const SAMPLE_PROMOTERS = ['Maria Paula A.', 'Juan Felipe B.']

export const FILLER_USER = {
  name: 'XXX',
  email: 'xxx@gmail.com',
  role: 'XXXXX',
  phone_number: 'XXXXXXXXXX',
  brand_id: 0
}

export const RATING_QUESTIONS = [
  '1. El promotor cumplió con su horario agendado',
  '2. El promotor mantuvo una buena presentación personal',
  '3. El promotor hizo un uso adecuado del celular'
]
