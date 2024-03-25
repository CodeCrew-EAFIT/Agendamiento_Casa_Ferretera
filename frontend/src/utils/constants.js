export const ADMIN = 'Administrador'
export const SUPERVISOR = 'Supervisor'
export const PROMOTER = 'Promotor'
export const CHIEF = 'Jefe Directo'

export const USER_TYPES = [ADMIN, SUPERVISOR, PROMOTER, CHIEF]

export const ADMIN_USERS = [ADMIN, CHIEF]
export const BLOCK_USERS = [ADMIN, SUPERVISOR]

export const USER_TO_NAME = {
  [ADMIN]: 'Admin',
  [SUPERVISOR]: 'Juan Fernando G.',
  [CHIEF]: 'Carolina S.',
  [PROMOTER]: 'Maria Paula A.'
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
