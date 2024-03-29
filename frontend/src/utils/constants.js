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

export const INPUT_PLACEHOLDERS = {
  location: 'Escoger sede',
  date: 'Fecha',
  startTime: 'Hora inicio',
  endTime: 'Hora final',
  promoter: 'Promotor'
}

export const SAMPLE_PROMOTERS = [
  'Maria Paula A.',
  'Juan Felipe B.'
]

export const SAMPLE_USER_DATA = [
  {
    name: 'Carolina Sierra',
    email: 'carolina.sierra@gmail.com',
    role: 'Jefe Directo',
    store: 'Stanley',
  },
  {
    name: 'Juan Fernando Gutierrez',
    email: 'juanfergut@gmail.com',
    role: 'Supervisor',
    store: 'Sede Palacé',
  },
  {
    name: 'Maria Paula Ayala',
    email: 'mpayalal@eafit.edu.co',
    role: 'Promotor',
    store: 'Stanley',
  },
  {
    name: 'Sara Lopez',
    email: 'saral@casaferretera.com',
    role: 'Supervisor',
    store: 'Sede Envigado',
  },
  {
    name: 'Felipe Cárdenas',
    email: 'felipec@casaferretera.com',
    role: 'Supervisor',
    store: 'Sede Apartadó',
  },
  {
    name: 'Andrés García',
    email: 'andresg@casaferretera.com',
    role: 'Administrador',
    store: 'Administrador',
  },
  {
    name: 'Ana Maria Martinez',
    email: 'anam@casaferretera.com',
    role: 'Administrador',
    store: 'Administrador',
  },
  {
    name: 'Diana Sofia Sierra',
    email: 'd.sofia_21@bandd.com',
    role: 'Jefe Directo',
    store: 'Black+Decker',
  },
  {
    name: 'Camila Ramirez',
    email: 'camila_ramirez@bandd.com',
    role: 'Promotor',
    store: 'Black+Decker',
  },
  {
    name: 'XXX',
    email: 'xxx@gmail.com',
    role: 'XXXXX',
    store: 'XXXXXXXX',
  },
  {
    name: 'XXX',
    email: 'xxx@gmail.com',
    role: 'XXXXX',
    store: 'XXXXXXXX',
  },
  {
    name: 'XXX',
    email: 'xxx@gmail.com',
    role: 'XXXXX',
    store: 'XXXXXXXX',
  },
  {
    name: 'XXX',
    email: 'xxx@gmail.com',
    role: 'XXXXX',
    store: 'XXXXXXXX',
  },
  {
    name: 'XXX',
    email: 'xxx@gmail.com',
    role: 'XXXXX',
    store: 'XXXXXXXX',
  },
  {
    name: 'XXX',
    email: 'xxx@gmail.com',
    role: 'XXXXX',
    store: 'XXXXXXXX',
  },
  {
    name: 'XXX',
    email: 'xxx@gmail.com',
    role: 'XXXXX',
    store: 'XXXXXXXX',
  },
  {
    name: 'XXX',
    email: 'xxx@gmail.com',
    role: 'XXXXX',
    store: 'XXXXXXXX',
  },
  {
    name: 'XXX',
    email: 'xxx@gmail.com',
    role: 'XXXXX',
    store: 'XXXXXXXX',
  },
  {
    name: 'XXX',
    email: 'xxx@gmail.com',
    role: 'XXXXX',
    store: 'XXXXXXXX',
  },
  {
    name: 'XXX',
    email: 'xxx@gmail.com',
    role: 'XXXXX',
    store: 'XXXXXXXX',
  },
  {
    name: 'XXX',
    email: 'xxx@gmail.com',
    role: 'XXXXX',
    store: 'XXXXXXXX',
  },
]
