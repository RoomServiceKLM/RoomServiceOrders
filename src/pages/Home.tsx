import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  Baby,
  CheckCircle2,
  Clock3,
  Coffee,
  Leaf,
  Minus,
  Moon,
  Plus,
  ReceiptText,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sun,
  UtensilsCrossed,
  Wine,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { MENU } from '@/data/menu'
import {
  ITEM_I18N,
  PRICE_NOTE_I18N,
  SECTION_I18N,
  VARIANT_LABEL_I18N,
  VARIANT_OPTION_I18N,
} from '@/data/menu-i18n'
import { VALID_ROOMS } from '@/data/rooms'
import type { CartLine, MenuItem, MenuSection, VariantOption } from '@/types/menu'
import '../App.css'

const WEBAPP_URL =
  'https://script.google.com/macros/s/AKfycbzUR2B4VKCtcKU0U-13osHc4GCiXg7LkkQgOgHtvJKAEY5H74cCZla19rfa8gQ_UPmi/exec'

const DELIVERY_CHARGE = 6
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`
const CATEGORY_ORDER = ['breakfast', 'allday', 'night', 'kids', 'drinks', 'extras']
const LIMITED_DRINK_SECTIONS = new Set([
  'Smoothies',
  'Signature Cocktails',
  'Cocktails Clásicos',
  'Mocktails (sin alcohol)',
  'Spritz',
  'Sangría (por copa)',
  'Espumosos y Aperitivos',
])

type Language = 'es' | 'en'

type Selection = {
  v1: number | null
  v2: number | null
  mods: number[]
  mods2: number[]
}

const CATEGORY_META: Record<string, { title: Record<Language, string>; short: string; icon: LucideIcon }> = {
  breakfast: { title: { es: 'Desayuno', en: 'Breakfast' }, short: '07:00–12:00', icon: Coffee },
  allday: { title: { es: 'Todo el día', en: 'All Day' }, short: '12:00–03:00', icon: UtensilsCrossed },
  night: { title: { es: 'Noche', en: 'Night' }, short: '03:00–07:00', icon: Moon },
  kids: { title: { es: 'Infantil', en: 'Kids' }, short: '12:00–03:00', icon: Baby },
  drinks: { title: { es: 'Bebidas', en: 'Drinks' }, short: '24 h', icon: Wine },
  extras: { title: { es: 'Extras', en: 'Extras' }, short: 'Servicio', icon: Sparkles },
}

const PAYMENT_OPTIONS = [
  { value: 'Cargo a la habitación', label: { es: 'Cargo a la habitación', en: 'Charge to the room' } },
  { value: 'Tarjeta a la entrega', label: { es: 'Tarjeta a la entrega', en: 'Card on delivery' } },
  { value: 'Efectivo a la entrega', label: { es: 'Efectivo a la entrega', en: 'Cash on delivery' } },
]

const COPY = {
  es: {
    serviceCurrent: 'Servicio actual',
    order: 'Pedido',
    reviewOrder: 'Revisar pedido',
    viewMenu: 'Ver carta',
    heroEyebrow: 'Kimpton Los Monteros Marbella',
    heroText:
      'Pide desayuno, comida, cena, bebidas o algo dulce directamente a tu habitación. Misma carta, mismo equipo, ahora con una experiencia pensada para el huésped.',
    heroNote: 'Para modificaciones o pedidos especiales, contacta con room service.',
    badges: ['35–45 min', 'Opciones healthy', 'Alergias controladas'],
    direct: 'Pedido directo a Room Service',
    menuKicker: 'La carta',
    menuTitle: 'Elige, personaliza y envía.',
    menuText: 'Todo lo que ves aquí llega con la misma información que el equipo necesita: variantes, alergias y notas.',
    searchPlaceholder: 'Buscar en toda la carta: café, pizza, gazpacho…',
    products: 'productos',
    unavailableNow: 'No disponible ahora',
    availableAt: (hours: string) => `Disponible ${hours}`,
    blockedCategory: (hours: string) => `Esta carta está disponible en horario ${hours}.`,
    chooseOption: 'Elige una opción para continuar.',
    add: 'Añadir',
    yourOrder: 'Tu pedido',
    emptyTitle: 'Tu bandeja está vacía.',
    emptyText: 'Elige algo de la carta para empezar.',
    deliveryData: 'Datos de entrega',
    room: 'Nº de habitación *',
    roomPlaceholder: 'Ej. 214',
    name: 'Nombre *',
    namePlaceholder: 'Nombre del huésped',
    people: 'Comensales *',
    select: 'Selecciona',
    allergies: 'Alergias e intolerancias *',
    noAllergies: 'No tengo alergias',
    yesSpecify: 'Sí, especificar',
    allergyPlaceholder: 'Ej. frutos secos, gluten, lactosa…',
    preferences: 'Preferencias',
    notesPlaceholder: 'Sin cebolla, sin hielo, celebración, temperatura…',
    payment: 'Método de pago *',
    cashQuestion: '¿Con cuánto vas a pagar? *',
    cashPlaceholder: 'Ej. 50 €',
    noPostWarning: 'Esta habitación no tiene cargo a la habitación disponible. Elige tarjeta o efectivo.',
    estimated: 'Entrega estimada: 35–45 min.',
    premiumWater:
      'Las botellas de agua premium tienen un coste de 7 €. El agua de Housekeeping es complementaria.',
    accept: 'He revisado el pedido y acepto el tiempo estimado de entrega.',
    beforeSend: 'Antes de enviar:',
    subtotal: 'Subtotal',
    deliveryCharge: 'Cargo de entrega',
    total: 'Total',
    confirm: 'Confirmar pedido',
    sending: 'Enviando pedido…',
    sentDirect: 'El pedido se envía directamente al equipo de Room Service.',
    footerBrand: 'Room Service · Kimpton Los Monteros Marbella',
    footerNote: 'Para peticiones especiales de F&B, contacta con room service.',
    sent: 'Pedido enviado',
    sentText: '¡Gracias por confiar en Room Service!',
    sentEta: 'Tiempo estimado de entrega: 35–45 minutos.',
    newOrder: 'Hacer otro pedido',
    services: { breakfast: 'Desayuno', allday: 'All Day Menu', night: 'Night Menu' },
    errors: {
      room: 'Indica el número de habitación.',
      roomInvalid: 'Revisa el número de habitación: no consta en el hotel.',
      name: 'Indica el nombre del huésped.',
      people: 'Selecciona el número de personas.',
      items: 'Añade al menos un producto a tu pedido.',
      allergy: 'Responde a la pregunta de alergias e intolerancias.',
      allergyDetail: 'Especifica la alergia o intolerancia.',
      payment: 'Selecciona un método de pago.',
      cashRequired: 'Indica con cuánto vas a pagar en efectivo.',
      cashLow: 'El importe en efectivo debe ser igual o superior al total.',
      noPost: 'Esta habitación no puede seleccionar cargo a la habitación.',
      accept: 'Confirma que has revisado el pedido y el tiempo estimado de entrega.',
      unavailable: 'Hay productos fuera de horario. Retíralos del pedido para continuar.',
    },
  },
  en: {
    serviceCurrent: 'Current service',
    order: 'Order',
    reviewOrder: 'Review order',
    viewMenu: 'View menu',
    heroEyebrow: 'Kimpton Los Monteros Marbella',
    heroText:
      'Order breakfast, lunch, dinner, drinks or something sweet straight to your room. Same menu, same team, now designed around the guest.',
    heroNote: 'For changes or special orders, contact room service.',
    badges: ['35–45 min', 'Healthy options', 'Allergy-aware'],
    direct: 'Straight to Room Service',
    menuKicker: 'The menu',
    menuTitle: 'Choose, customise and send.',
    menuText: 'Everything you see here reaches the team with the same information they need: variants, allergies and notes.',
    searchPlaceholder: 'Search the whole menu: coffee, pizza, gazpacho…',
    products: 'items',
    unavailableNow: 'Unavailable now',
    availableAt: (hours: string) => `Available ${hours}`,
    blockedCategory: (hours: string) => `This menu is available from ${hours}.`,
    chooseOption: 'Choose an option to continue.',
    add: 'Add',
    yourOrder: 'Your order',
    emptyTitle: 'Your tray is empty.',
    emptyText: 'Choose something from the menu to start.',
    deliveryData: 'Delivery details',
    room: 'Room number *',
    roomPlaceholder: 'E.g. 214',
    name: 'Name *',
    namePlaceholder: 'Guest name',
    people: 'Covers *',
    select: 'Select',
    allergies: 'Allergies and intolerances *',
    noAllergies: 'No allergies',
    yesSpecify: 'Yes, specify',
    allergyPlaceholder: 'E.g. nuts, gluten, lactose…',
    preferences: 'Preferences',
    notesPlaceholder: 'No onion, no ice, celebration, temperature…',
    payment: 'Payment method *',
    cashQuestion: 'How much will you pay with? *',
    cashPlaceholder: 'E.g. €50',
    noPostWarning: 'This room cannot use charge to room. Please choose card or cash.',
    estimated: 'Estimated delivery: 35–45 min.',
    premiumWater: 'Premium water bottles cost €7. Housekeeping water is complimentary.',
    accept: 'I have reviewed the order and accept the estimated delivery time.',
    beforeSend: 'Before sending:',
    subtotal: 'Subtotal',
    deliveryCharge: 'Delivery charge',
    total: 'Total',
    confirm: 'Confirm order',
    sending: 'Sending order…',
    sentDirect: 'The order is sent directly to the Room Service team.',
    footerBrand: 'Room Service · Kimpton Los Monteros Marbella',
    footerNote: 'For special F&B requests, contact room service.',
    sent: 'Order sent',
    sentText: 'Thank you for choosing Room Service!',
    sentEta: 'Estimated delivery time: 35–45 minutes.',
    newOrder: 'Place another order',
    services: { breakfast: 'Breakfast', allday: 'All Day Menu', night: 'Night Menu' },
    errors: {
      room: 'Enter the room number.',
      roomInvalid: 'Please check the room number: it does not exist in the hotel.',
      name: 'Enter the guest name.',
      people: 'Select the number of people.',
      items: 'Add at least one item to your order.',
      allergy: 'Answer the allergies and intolerances question.',
      allergyDetail: 'Specify the allergy or intolerance.',
      payment: 'Select a payment method.',
      cashRequired: 'Enter how much you will pay in cash.',
      cashLow: 'The cash amount must be equal to or higher than the total.',
      noPost: 'This room cannot select charge to room.',
      accept: 'Confirm that you reviewed the order and the estimated delivery time.',
      unavailable: 'Some items are out of hours. Remove them from the order to continue.',
    },
  },
} as const

const ALLERGEN_LABELS: Record<string, { es: string; en: string }> = {
  gluten: { es: 'Gluten', en: 'Gluten' },
  huevo: { es: 'Huevo', en: 'Egg' },
  lácteos: { es: 'Lácteos', en: 'Dairy' },
  lacteos: { es: 'Lácteos', en: 'Dairy' },
  cerdo: { es: 'Cerdo', en: 'Pork' },
  'frutos secos': { es: 'Frutos secos', en: 'Nuts' },
  soja: { es: 'Soja', en: 'Soy' },
  sésamo: { es: 'Sésamo', en: 'Sesame' },
  sesamo: { es: 'Sésamo', en: 'Sesame' },
  pescado: { es: 'Pescado', en: 'Fish' },
  moluscos: { es: 'Moluscos', en: 'Molluscs' },
  crustáceos: { es: 'Crustáceos', en: 'Crustaceans' },
  crustaceos: { es: 'Crustáceos', en: 'Crustaceans' },
  mostaza: { es: 'Mostaza', en: 'Mustard' },
  sulfitos: { es: 'Sulfitos', en: 'Sulphites' },
  alcohol: { es: 'Alcohol', en: 'Alcohol' },
  'sin alcohol': { es: 'Sin alcohol', en: 'Alcohol-free' },
  'sésamo (chía)': { es: 'Sésamo (chía)', en: 'Sesame (chia)' },
  'sesamo (chia)': { es: 'Sésamo (chía)', en: 'Sesame (chia)' },
  'ninguno declarado': { es: 'Ninguno declarado', en: 'None declared' },
  'consultar alérgenos con room service': {
    es: 'Consultar alérgenos con Room Service',
    en: 'Check allergens with Room Service',
  },
}

function itemDisplayName(item: MenuItem, language: Language) {
  return ITEM_I18N[item.id]?.name[language] ?? item.name
}

function itemDisplayDesc(item: MenuItem, language: Language) {
  return ITEM_I18N[item.id]?.desc?.[language] ?? item.desc
}

function sectionDisplayTitle(section: MenuSection, language: Language) {
  return SECTION_I18N[section.title]?.[language] ?? section.title
}

function localizedVariant(variant: VariantOption, language: Language): VariantOption {
  return {
    ...variant,
    label: VARIANT_LABEL_I18N[variant.label]?.[language] ?? variant.label,
    options: variant.options.map((option) => VARIANT_OPTION_I18N[option]?.[language] ?? option),
  }
}

function priceNoteDisplay(item: MenuItem, language: Language) {
  if (!item.priceNote) return undefined
  if (item.priceNote === '9 €/ud') return language === 'en' ? '€9/unit' : item.priceNote
  return PRICE_NOTE_I18N[item.priceNote]?.[language] ?? item.priceNote
}

const ITEM_INDEX: Record<string, MenuItem> = {}
const ITEM_LOCATION: Record<string, { categoryKey: string; section: MenuSection }> = {}
Object.entries(MENU).forEach(([categoryKey, category]) =>
  category.sections.forEach((section) =>
    section.items.forEach((item) => {
      ITEM_INDEX[item.id] = item
      ITEM_LOCATION[item.id] = { categoryKey, section }
    }),
  ),
)

const fmt = (value: number) =>
  `${value.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`

function parseHour(value: string) {
  const [hours, minutes] = value.split(':').map(Number)
  return hours + minutes / 60
}

function inTimeRange(start: string, end: string) {
  const now = new Date()
  const current = now.getHours() + now.getMinutes() / 60
  const from = parseHour(start)
  const to = parseHour(end)
  if (from === to) return true
  if (from < to) return current >= from && current < to
  return current >= from || current < to
}

function hoursRange(hours: string) {
  const [start, end] = hours.split('–').map((part) => part.trim())
  return inTimeRange(start, end)
}

function currentServiceKey() {
  if (inTimeRange('07:00', '12:00')) return 'breakfast'
  if (inTimeRange('12:00', '03:00')) return 'allday'
  return 'night'
}

function serviceLabel() {
  const key = currentServiceKey()
  if (key === 'breakfast') return 'Desayuno'
  if (key === 'allday') return 'All Day Menu'
  return 'Night Menu'
}

function categoryAvailable(key: string) {
  if (key === 'extras' || key === 'drinks') return true
  if (key === 'kids') return inTimeRange('12:00', '03:00')
  if (key === 'breakfast') return inTimeRange('07:00', '12:00')
  if (key === 'allday') return inTimeRange('12:00', '03:00')
  if (key === 'night') return inTimeRange('03:00', '07:00')
  return true
}

function sectionAvailable(categoryKey: string, section: MenuSection) {
  if (categoryKey === 'drinks' && (section.hours || LIMITED_DRINK_SECTIONS.has(section.title))) {
    return hoursRange(section.hours ?? '09:00 – 01:00')
  }
  return categoryAvailable(categoryKey)
}

function genOrderId() {
  const date = new Date()
  return `RS-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(
    date.getDate(),
  ).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`
}

function defaultSelection(item: MenuItem): Selection {
  return {
    v1: item.variant?.required ? null : 0,
    v2: item.variant2?.required ? null : 0,
    mods: [],
    mods2: [],
  }
}

function selectionFor(item: MenuItem, selections: Record<string, Selection>): Selection {
  return selections[item.id] ?? defaultSelection(item)
}

function modsKey(mods: number[]) {
  return mods.length ? [...mods].sort((a, b) => a - b).join('.') : 'N'
}

function modsText(variant: VariantOption | undefined, mods: number[], language: Language) {
  if (!variant) return ''
  if (!mods.length) return language === 'en' ? 'Standard' : 'Normal'
  return [...mods]
    .sort((a, b) => a - b)
    .map((index) => variant.options[index])
    .filter(Boolean)
    .join(' · ')
}

function keyFor(item: MenuItem, selection: Selection) {
  const first = item.variant?.multi
    ? modsKey(selection.mods)
    : selection.v1 === null
      ? 'N'
      : String(selection.v1)
  const second = item.variant2?.multi
    ? modsKey(selection.mods2)
    : selection.v2 === null
      ? 'N'
      : String(selection.v2)
  return `${item.id}|${first}|${second}`
}

function unitPrice(item: MenuItem, v1?: number | null, v2?: number | null) {
  let price = item.price
  if (item.variant?.deltas && typeof v1 === 'number') price += item.variant.deltas[v1] ?? 0
  if (item.variant2?.deltas && typeof v2 === 'number') price += item.variant2.deltas[v2] ?? 0
  return price
}

function billableUnitPrice(item: MenuItem, v1?: number | null, v2?: number | null) {
  if (item.id === 'b-continental' && inTimeRange('07:00', '11:00')) return 0
  return unitPrice(item, v1, v2)
}

function singleVariantText(variant: VariantOption | undefined, value: number | null) {
  if (!variant || variant.multi || value === null) return undefined
  return variant.options[value]
}

function cartVariantText(line: CartLine) {
  return [line.variantText, line.variant2Text].filter(Boolean).join(' · ')
}

function cartLineDisplayVariant(line: CartLine, item: MenuItem | undefined, language: Language) {
  if (!item) return cartVariantText(line)
  const firstVariant = item.variant ? localizedVariant(item.variant, language) : undefined
  const secondVariant = item.variant2 ? localizedVariant(item.variant2, language) : undefined
  const first = item.variant?.multi
    ? modsText(firstVariant, line.mods ?? [], language)
    : singleVariantText(firstVariant, line.variantIdx ?? null)
  const second = item.variant2?.multi
    ? modsText(secondVariant, line.mods2 ?? [], language)
    : singleVariantText(secondVariant, line.variant2Idx ?? null)
  return [first, second].filter(Boolean).join(' · ')
}

function allergenChips(value: string, language: Language) {
  if (!value || value === '—' || value.toLowerCase().includes('ninguno')) return null
  return value
    .split('·')
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 4)
    .map((item) => ALLERGEN_LABELS[item.toLowerCase()]?.[language] ?? item)
}

function isMeatVariant(variant: VariantOption | undefined) {
  return Boolean(variant?.label.toLowerCase().includes('punto de la carne'))
}

function normalizeRoom(value: string) {
  const clean = value.trim().toLowerCase()
  return /^\d+$/.test(clean) ? String(parseInt(clean, 10)) : clean
}

const VALID_ROOM_SET = new Set(VALID_ROOMS.map(normalizeRoom))

function parseMoney(value: string) {
  const normalized = value.replace(',', '.').replace(/[^0-9.]/g, '')
  const amount = Number(normalized)
  return Number.isFinite(amount) ? amount : 0
}

export default function Home() {
  const [language, setLanguage] = useState<Language>('es')
  const [activeTab, setActiveTab] = useState(currentServiceKey())
  const [query, setQuery] = useState('')
  const [selections, setSelections] = useState<Record<string, Selection>>({})
  const [cart, setCart] = useState<Record<string, CartLine>>({})
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const first = MENU[currentServiceKey()]?.sections[0]?.title
    return first ? { [`${currentServiceKey()}::${first}`]: true } : {}
  })
  const [cartOpen, setCartOpen] = useState(false)
  const [room, setRoom] = useState('')
  const [guest, setGuest] = useState('')
  const [pax, setPax] = useState('')
  const [allergy, setAllergy] = useState('')
  const [allergyDetail, setAllergyDetail] = useState('')
  const [notes, setNotes] = useState('')
  const [payment, setPayment] = useState('Cargo a la habitación')
  const [cashAmount, setCashAmount] = useState('')
  const [noPostRooms, setNoPostRooms] = useState<string[]>(() => window.ROOM_SERVICE_NO_POST ?? [])
  const [accepted, setAccepted] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [status, setStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [orderId, setOrderId] = useState(genOrderId)
  const submitLock = useRef(false)

  const copy = COPY[language]

  useEffect(() => {
    const endpoint = window.ROOM_SERVICE_WEBAPP_URL || WEBAPP_URL
    if (!endpoint) return
    fetch(`${endpoint}?action=noPost`)
      .then((response) => response.json())
      .then((data: { ok?: boolean; rooms?: string[] }) => {
        if (data?.ok && Array.isArray(data.rooms)) setNoPostRooms(data.rooms)
      })
      .catch(() => {
        if (window.ROOM_SERVICE_NO_POST?.length) setNoPostRooms(window.ROOM_SERVICE_NO_POST)
      })
  }, [])

  const isNoPostRoom = noPostRooms.map(normalizeRoom).includes(normalizeRoom(room)) && normalizeRoom(room) !== ''
  const isInvalidRoom = room.trim() !== '' && !VALID_ROOM_SET.has(normalizeRoom(room))

  const cartLines = useMemo(
    () =>
      Object.values(cart).map((line) => {
        const item = ITEM_INDEX[line.id]
        const unit = item ? billableUnitPrice(item, line.variantIdx, line.variant2Idx) : line.unit
        return {
          ...line,
          unit,
          variant: cartVariantText(line),
          displayName: item ? itemDisplayName(item, language) : line.name,
          displayVariant: cartLineDisplayVariant(line, item, language),
          total: unit * line.qty,
        }
      }),
    [cart, language],
  )

  const subtotal = cartLines.reduce((sum, line) => sum + line.total, 0)
  const deliveryCharge = cartLines.length ? DELIVERY_CHARGE : 0
  const cartTotal = subtotal + deliveryCharge
  const cartCount = cartLines.reduce((sum, line) => sum + line.qty, 0)
  const hasPremiumWater = cartLines.some((line) => line.id === 'x-voss-still' || line.id === 'x-voss-sparkling')
  const hasUnavailableItems = cartLines.some((line) => {
    const location = ITEM_LOCATION[line.id]
    return location ? !sectionAvailable(location.categoryKey, location.section) : false
  })

  function selectTab(key: string) {
    setActiveTab(key)
    setQuery('')
    const first = MENU[key]?.sections[0]?.title
    setOpenSections(first ? { [`${key}::${first}`]: true } : {})
  }

  function updateSelection(item: MenuItem, patch: Partial<Selection>) {
    setSelections((current) => ({
      ...current,
      [item.id]: { ...selectionFor(item, current), ...patch },
    }))
  }

  function toggleMod(item: MenuItem, index: number, target: 'mods' | 'mods2') {
    const current = selectionFor(item, selections)
    const values = current[target]
    const nextValues = values.includes(index) ? values.filter((value) => value !== index) : [...values, index]
    updateSelection(item, { [target]: nextValues } as Partial<Selection>)
  }

  function changeQty(item: MenuItem, selection: Selection, delta: number) {
    const key = keyFor(item, selection)
    setCart((current) => {
      const next = { ...current }
      const line = next[key]
      const min = item.min ?? 1
      const maxQty = item.maxQty ?? Number.POSITIVE_INFINITY
      if (delta > 0) {
        if (line) {
          if (line.qty < maxQty) next[key] = { ...line, qty: line.qty + 1 }
        } else {
          const firstVariant = item.variant ? localizedVariant(item.variant, 'es') : undefined
          const secondVariant = item.variant2 ? localizedVariant(item.variant2, 'es') : undefined
          next[key] = {
            key,
            id: item.id,
            name: itemDisplayName(item, 'es'),
            qty: min,
            unit: billableUnitPrice(item, selection.v1, selection.v2),
            variantIdx: selection.v1,
            variant2Idx: selection.v2,
            mods: selection.mods,
            mods2: selection.mods2,
            variantText: item.variant?.multi
              ? modsText(firstVariant, selection.mods, 'es')
              : singleVariantText(firstVariant, selection.v1),
            variant2Text: item.variant2?.multi
              ? modsText(secondVariant, selection.mods2, 'es')
              : singleVariantText(secondVariant, selection.v2),
          }
        }
      } else if (line) {
        if (line.qty <= min) {
          delete next[key]
        } else {
          next[key] = { ...line, qty: Math.max(min, line.qty - 1) }
        }
      }
      return next
    })
  }

  function changeLineQty(key: string, delta: number) {
    setCart((current) => {
      const line = current[key]
      if (!line) return current
      const item = ITEM_INDEX[line.id]
      const min = item?.min ?? 1
      const maxQty = item?.maxQty ?? Number.POSITIVE_INFINITY
      const next = { ...current }
      if (delta < 0 && line.qty <= min) {
        delete next[key]
      } else if (delta > 0 && line.qty >= maxQty) {
        return current
      } else {
        next[key] = { ...line, qty: Math.max(min, line.qty + delta) }
      }
      return next
    })
  }

  function toggleSection(key: string) {
    setOpenSections((current) => ({ ...current, [key]: !current[key] }))
  }

  function validate() {
    const nextErrors: string[] = []
    if (!room.trim()) nextErrors.push(copy.errors.room)
    else if (!VALID_ROOM_SET.has(normalizeRoom(room))) nextErrors.push(copy.errors.roomInvalid)
    if (!guest.trim()) nextErrors.push(copy.errors.name)
    if (!pax) nextErrors.push(copy.errors.people)
    if (!cartLines.length) nextErrors.push(copy.errors.items)
    if (hasUnavailableItems) nextErrors.push(copy.errors.unavailable)
    if (!allergy) nextErrors.push(copy.errors.allergy)
    if (allergy === 'Sí' && !allergyDetail.trim()) nextErrors.push(copy.errors.allergyDetail)
    if (!payment) nextErrors.push(copy.errors.payment)
    if (isNoPostRoom && payment === 'Cargo a la habitación') nextErrors.push(copy.errors.noPost)
    if (payment === 'Efectivo a la entrega') {
      if (!cashAmount.trim()) nextErrors.push(copy.errors.cashRequired)
      else if (parseMoney(cashAmount) < cartTotal) nextErrors.push(copy.errors.cashLow)
    }
    if (!accepted) nextErrors.push(copy.errors.accept)
    return nextErrors
  }

  async function submitOrder() {
    if (submitLock.current) return
    submitLock.current = true

    const nextErrors = validate()
    setErrors(nextErrors)
    setStatus('')
    if (nextErrors.length) {
      submitLock.current = false
      return
    }

    const payload = {
      orderId,
      timestamp: new Date().toISOString(),
      service: serviceLabel(),
      room: room.trim(),
      guest: guest.trim(),
      pax,
      payment,
      cashAmount: payment === 'Efectivo a la entrega' ? cashAmount.trim() : '',
      orderedBy: 'Web huésped',
      source: 'Pedido cliente web',
      allergy,
      allergyDetail: allergyDetail.trim(),
      notes: notes.trim(),
      receptionNote: 'Pedido realizado directamente por el huésped desde la web.',
      items: cartLines.map((line) => {
        const category = ITEM_LOCATION[line.id]?.categoryKey || ''
        return {
          id: line.id,
          category,
          name: category === 'kids' && !/ kids$/i.test(line.name) ? `${line.name} Kids` : line.name,
          variant: line.variant || null,
          qty: line.qty,
          unit: line.unit,
          total: line.total,
        }
      }),
      subtotal,
      deliveryCharge,
      total: cartTotal,
    }

    setSubmitting(true)
    try {
      const endpoint = window.ROOM_SERVICE_WEBAPP_URL || WEBAPP_URL
      await fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      })
      setSuccess(true)
    } catch {
      submitLock.current = false
      setStatus(
        language === 'es'
          ? 'No hemos podido enviar el pedido. Revisa la conexión e inténtalo de nuevo.'
          : 'We could not send the order. Check the connection and try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  function resetOrder() {
    submitLock.current = false
    setSuccess(false)
    setCart({})
    setSelections({})
    setAllergy('')
    setAllergyDetail('')
    setNotes('')
    setPax('')
    setCashAmount('')
    setAccepted(false)
    setErrors([])
    setStatus('')
    setOrderId(genOrderId())
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function renderSingleVariant(
    item: MenuItem,
    variant: VariantOption,
    value: number | null,
    onChange: (index: number) => void,
  ) {
    const displayVariant = localizedVariant(variant, language)
    if (isMeatVariant(variant)) {
      return (
        <label className="select-label" key={`${item.id}-${variant.label}`}>
          {displayVariant.label}
          <select onChange={(event) => onChange(Number(event.target.value))} value={value ?? 0}>
            {displayVariant.options.map((option, index) => (
              <option key={option} value={index}>
                {option}
              </option>
            ))}
          </select>
        </label>
      )
    }

    return (
      <div className="modifier-group" key={`${item.id}-${variant.label}`}>
        <span>
          {displayVariant.label}
          {variant.required ? ' *' : ''}
        </span>
        <div className="modifier-chips">
          {displayVariant.options.map((option, index) => (
            <button
              className={value === index ? 'chip chip--on' : 'chip'}
              key={option}
              onClick={() => onChange(index)}
              type="button"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    )
  }

  function renderMultiVariant(item: MenuItem, variant: VariantOption, values: number[], target: 'mods' | 'mods2') {
    const displayVariant = localizedVariant(variant, language)
    return (
      <div className="modifier-group" key={`${item.id}-${variant.label}`}>
        <span>
          {displayVariant.label}
          {variant.minSelections ? ' *' : ''}
        </span>
        <div className="modifier-chips">
          {displayVariant.options.map((option, index) => (
            <label className={values.includes(index) ? 'chip chip--on' : 'chip'} key={option}>
              <input checked={values.includes(index)} onChange={() => toggleMod(item, index, target)} type="checkbox" />
              {option}
            </label>
          ))}
        </div>
      </div>
    )
  }

  function renderItem(item: MenuItem, available: boolean) {
    const selection = selectionFor(item, selections)
    const key = keyFor(item, selection)
    const line = cart[key]
    const selectedSomewhere = cartLines.some((cartLine) => cartLine.id === item.id)
    const chips = allergenChips(item.alg, language)
    const displayName = itemDisplayName(item, language)
    const displayDesc = itemDisplayDesc(item, language)
    const displayPrice = priceNoteDisplay(item, language) ?? fmt(unitPrice(item, selection.v1, selection.v2))
    const missingRequired =
      Boolean(item.variant?.required && !item.variant.multi && selection.v1 === null) ||
      Boolean(item.variant?.multi && item.variant.minSelections && selection.mods.length < item.variant.minSelections) ||
      Boolean(item.variant2?.required && !item.variant2.multi && selection.v2 === null) ||
      Boolean(item.variant2?.multi && item.variant2.minSelections && selection.mods2.length < item.variant2.minSelections)
    const maxReached = Boolean(line && item.maxQty && line.qty >= item.maxQty)

    return (
      <article
        className={`menu-card${selectedSomewhere ? ' menu-card--selected' : ''}${!available ? ' menu-card--blocked' : ''}`}
        key={item.id}
      >
        {!available ? <div className="menu-card__unavailable">{copy.unavailableNow}</div> : null}
        <div className="menu-card__top">
          <div>
            <h3>{displayName}</h3>
            {displayDesc ? <p>{displayDesc}</p> : null}
          </div>
          <strong>{displayPrice}</strong>
        </div>

        <div className="menu-card__meta">
          {chips?.map((chip) => <span key={chip}>{chip}</span>)}
          {item.min ? <em>{language === 'es' ? `Pedido mínimo: ${item.min} uds.` : `Minimum order: ${item.min} units`}</em> : null}
        </div>

        {item.note ? <div className="menu-card__note">{item.note}</div> : null}

        {item.variant
          ? item.variant.multi
            ? renderMultiVariant(item, item.variant, selection.mods, 'mods')
            : renderSingleVariant(item, item.variant, selection.v1, (index) => updateSelection(item, { v1: index }))
          : null}

        {item.variant2
          ? item.variant2.multi
            ? renderMultiVariant(item, item.variant2, selection.mods2, 'mods2')
            : renderSingleVariant(item, item.variant2, selection.v2, (index) => updateSelection(item, { v2: index }))
          : null}

        {missingRequired && available ? <div className="menu-card__required">{copy.chooseOption}</div> : null}

        <div className="menu-card__actions">
          {available ? (
            line ? (
              <div className="quantity-stepper" aria-label={`Cantidad de ${displayName}`}>
                <button onClick={() => changeQty(item, selection, -1)} type="button">
                  <Minus size={15} />
                </button>
                <span>{line.qty}</span>
                <button disabled={maxReached} onClick={() => changeQty(item, selection, 1)} type="button">
                  <Plus size={15} />
                </button>
              </div>
            ) : (
              <button
                className="add-button"
                disabled={missingRequired}
                onClick={() => changeQty(item, selection, 1)}
                type="button"
              >
                {copy.add} <Plus size={15} />
              </button>
            )
          ) : null}
        </div>
      </article>
    )
  }

  function renderSection(categoryKey: string, section: MenuSection, items: MenuItem[], forceOpen = false) {
    const key = `${categoryKey}::${section.title}`
    const open = forceOpen || Boolean(openSections[key])
    const available = sectionAvailable(categoryKey, section)
    const limitedHours = categoryKey === 'drinks' && (section.hours || LIMITED_DRINK_SECTIONS.has(section.title))
    return (
      <section className="menu-section" key={key}>
        <button className="menu-section__header" onClick={() => toggleSection(key)} type="button">
          <span>{sectionDisplayTitle(section, language)}</span>
          <small>
            {items.length} {copy.products}
            {limitedHours ? ` · ${copy.availableAt(section.hours ?? '09:00 – 01:00')}` : ''}
            {!available ? ` · ${copy.unavailableNow}` : ''}
          </small>
        </button>
        {open ? <div className="menu-grid">{items.map((item) => renderItem(item, available))}</div> : null}
      </section>
    )
  }

  function renderMenu() {
    const search = query.trim().toLowerCase()
    if (search) {
      return Object.entries(MENU).map(([categoryKey, category]) =>
        category.sections.map((section) => {
          const hits = section.items.filter((item) =>
            `${itemDisplayName(item, language)} ${itemDisplayDesc(item, language) ?? ''} ${item.alg}`
              .toLowerCase()
              .includes(search),
          )
          if (!hits.length) return null
          return (
            <div className="search-group" key={`${categoryKey}-${section.title}`}>
              <p>{CATEGORY_META[categoryKey]?.title[language] ?? category.label}</p>
              {renderSection(categoryKey, section, hits, true)}
            </div>
          )
        }),
      )
    }

    const category = MENU[activeTab]
    const available = categoryAvailable(activeTab)
    return (
      <>
        {!available ? (
          <div className="availability-warning">
            <AlertTriangle size={17} />
            <span>{copy.blockedCategory(category.hours)}</span>
          </div>
        ) : null}
        {category.sections.map((section) => renderSection(activeTab, section, section.items))}
      </>
    )
  }

  function cartPanel(idPrefix: string) {
    return (
      <div className="cart-panel">
        <div className="cart-panel__header">
          <div>
            <h2>{copy.yourOrder}</h2>
          </div>
          <ReceiptText size={24} />
        </div>

        <div className="cart-lines">
          {!cartLines.length ? (
            <div className="cart-empty">
              <ShoppingBag size={28} />
              <p>
                <b>{copy.emptyTitle}</b>
                <br />
                {copy.emptyText}
              </p>
            </div>
          ) : (
            cartLines.map((line) => {
              const item = ITEM_INDEX[line.id]
              const maxReached = Boolean(item?.maxQty && line.qty >= item.maxQty)
              return (
                <div className="cart-line" key={line.key}>
                  <div>
                    <strong>
                      {line.qty} × {line.displayName}
                    </strong>
                    {line.displayVariant ? <span>{line.displayVariant}</span> : null}
                  </div>
                  <div className="cart-line__controls">
                    <div className="quantity-stepper quantity-stepper--small">
                      <button onClick={() => changeLineQty(line.key, -1)} type="button">
                        <Minus size={13} />
                      </button>
                      <span>{line.qty}</span>
                      <button disabled={maxReached} onClick={() => changeLineQty(line.key, 1)} type="button">
                        <Plus size={13} />
                      </button>
                    </div>
                    <b>{fmt(line.total)}</b>
                  </div>
                </div>
              )
            })
          )}
        </div>

        <div className="checkout-block">
          <h3>{copy.deliveryData}</h3>
          <div className="field-grid">
            <label>
              {copy.room}
              <input
                id={`${idPrefix}-room`}
                onChange={(event) => setRoom(event.target.value)}
                placeholder={copy.roomPlaceholder}
                value={room}
              />
              {isInvalidRoom ? <span className="field-error">{copy.errors.roomInvalid}</span> : null}
            </label>
            <label>
              {copy.name}
              <input
                id={`${idPrefix}-guest`}
                onChange={(event) => setGuest(event.target.value)}
                placeholder={copy.namePlaceholder}
                value={guest}
              />
            </label>
            <div className="pax-field">
              <span>{copy.people}</span>
              <div className="pax-options" id={`${idPrefix}-pax`}>
                {['1', '2', '3', '4', '5', '+6'].map((value) => (
                  <button
                    className={pax === value ? 'pax-options__button pax-options__button--on' : 'pax-options__button'}
                    key={value}
                    onClick={() => setPax(value)}
                    type="button"
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="checkout-block">
          <h3>{copy.allergies}</h3>
          <div className="segmented">
            {[
              { value: 'No', label: copy.noAllergies },
              { value: 'Sí', label: copy.yesSpecify },
            ].map((option) => (
              <button
                className={allergy === option.value ? 'segmented__option segmented__option--on' : 'segmented__option'}
                key={option.value}
                onClick={() => setAllergy(option.value)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
          {allergy === 'Sí' ? (
            <input
              className="allergy-input"
              onChange={(event) => setAllergyDetail(event.target.value)}
              placeholder={copy.allergyPlaceholder}
              value={allergyDetail}
            />
          ) : null}
        </div>

        <div className="checkout-block">
          <h3>{copy.preferences}</h3>
          <textarea onChange={(event) => setNotes(event.target.value)} placeholder={copy.notesPlaceholder} value={notes} />
        </div>

        <div className="checkout-block">
          <h3>{copy.payment}</h3>
          <div className="payment-options">
            {PAYMENT_OPTIONS.map((option) => {
              const disabled = isNoPostRoom && option.value === 'Cargo a la habitación'
              return (
                <label
                  className={`${payment === option.value ? 'payment-option payment-option--on' : 'payment-option'}${
                    disabled ? ' payment-option--disabled' : ''
                  }`}
                  key={option.value}
                >
                  <input
                    checked={payment === option.value}
                    disabled={disabled}
                    name={`${idPrefix}-payment`}
                    onChange={() => setPayment(option.value)}
                    type="radio"
                  />
                  <span>{option.label[language]}</span>
                </label>
              )
            })}
          </div>
          {isNoPostRoom ? <div className="payment-warning">{copy.noPostWarning}</div> : null}
          {payment === 'Efectivo a la entrega' ? (
            <label className="cash-field">
              {copy.cashQuestion}
              <input
                inputMode="decimal"
                onChange={(event) => setCashAmount(event.target.value)}
                placeholder={copy.cashPlaceholder}
                value={cashAmount}
              />
            </label>
          ) : null}
        </div>

        <div className="service-notes">
          <p>
            <Clock3 size={15} /> {copy.estimated}
          </p>
          {hasPremiumWater ? (
            <p>
              <AlertTriangle size={15} /> {copy.premiumWater}
            </p>
          ) : null}
          {hasUnavailableItems ? (
            <p>
              <AlertTriangle size={15} /> {copy.errors.unavailable}
            </p>
          ) : null}
        </div>

        <label className="accept-box">
          <input checked={accepted} onChange={(event) => setAccepted(event.target.checked)} type="checkbox" />
          <span>{copy.accept}</span>
        </label>

        {errors.length ? (
          <div className="validation-box">
            <b>{copy.beforeSend}</b>
            {errors.map((error) => (
              <span key={error}>{error}</span>
            ))}
          </div>
        ) : null}
        {status ? <div className="status-box">{status}</div> : null}

        <div className="cart-totals">
          <div>
            <span>{copy.subtotal}</span>
            <strong>{fmt(subtotal)}</strong>
          </div>
          <div>
            <span>{copy.deliveryCharge}</span>
            <strong>{fmt(deliveryCharge)}</strong>
          </div>
          <div className="cart-totals__grand">
            <span>{copy.total}</span>
            <strong>{fmt(cartTotal)}</strong>
          </div>
        </div>
        <button className="submit-order" disabled={submitting || success} onClick={submitOrder} type="button">
          {submitting ? copy.sending : copy.confirm}
          <ArrowRight size={17} />
        </button>
        <p className="cart-disclaimer">
          <ShieldCheck size={14} /> {copy.sentDirect}
        </p>
      </div>
    )
  }

  return (
    <div className="room-service-app">
      <header className="topbar">
        <a className="topbar__brand" href="#inicio">
          <img alt="Kimpton Los Monteros Marbella" src={asset('images/logo.png')} />
        </a>
        <div className="topbar__status">
          <div className="language-switch" aria-label="Language selector">
            <button className={language === 'es' ? 'language-switch__option language-switch__option--on' : 'language-switch__option'} onClick={() => setLanguage('es')} type="button">
              ES
            </button>
            <button className={language === 'en' ? 'language-switch__option language-switch__option--on' : 'language-switch__option'} onClick={() => setLanguage('en')} type="button">
              EN
            </button>
          </div>
          <span>
            <Sun size={14} /> {copy.serviceCurrent}: {copy.services[currentServiceKey()]}
          </span>
          <button className="topbar__cart" onClick={() => setCartOpen(true)} type="button">
            <ShoppingBag size={17} />
            {copy.order}
            <b>{cartCount}</b>
          </button>
        </div>
      </header>

      <main>
        <section
          className="hero"
          id="inicio"
          style={{
            backgroundImage: `linear-gradient(105deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.72) 48%, rgba(0, 0, 0, 0.46) 100%), url(${asset('images/hero.webp')})`,
          }}
        >
          <div className="hero__content">
            <h1>Room Service</h1>
            <p>{copy.heroText}</p>
            <div className="hero__actions">
              <a className="primary-cta" href="#carta">
                {copy.viewMenu} <ArrowRight size={17} />
              </a>
              <button className="secondary-cta" onClick={() => setCartOpen(true)} type="button">
                {copy.reviewOrder}
              </button>
            </div>
            <div className="hero__badges">
              <span>
                <Clock3 size={15} /> {copy.badges[0]}
              </span>
              <span>
                <Leaf size={15} /> {copy.badges[1]}
              </span>
              <span>
                <ShieldCheck size={15} /> {copy.badges[2]}
              </span>
            </div>
            <p className="hero__note">{copy.heroNote}</p>
          </div>
          <div className="hero__card" aria-hidden="true">
            <span>{copy.serviceCurrent}</span>
            <strong>{copy.services[currentServiceKey()]}</strong>
            <p>{MENU[currentServiceKey()].hours}</p>
            <div>
              <CheckCircle2 size={18} /> {copy.direct}
            </div>
          </div>
        </section>

        <section className="menu-shell" id="carta">
          <div className="section-heading">
            <span>{copy.menuKicker}</span>
            <h2>{copy.menuTitle}</h2>
            <p>{copy.menuText}</p>
          </div>

          <div className="menu-layout">
            <div className="menu-browser">
              <div className="category-tabs" role="tablist">
                {CATEGORY_ORDER.map((key) => {
                  const Icon = CATEGORY_META[key]?.icon ?? UtensilsCrossed
                  return (
                    <button
                      aria-selected={activeTab === key}
                      className={activeTab === key ? 'category-tab category-tab--active' : 'category-tab'}
                      key={key}
                      onClick={() => selectTab(key)}
                      role="tab"
                      type="button"
                    >
                      <Icon size={17} />
                      <span>{CATEGORY_META[key]?.title[language] ?? MENU[key].label}</span>
                      <small>{CATEGORY_META[key]?.short ?? MENU[key].hours}</small>
                    </button>
                  )
                })}
              </div>

              <label className="menu-search">
                <Search size={17} />
                <input onChange={(event) => setQuery(event.target.value)} placeholder={copy.searchPlaceholder} value={query} />
                {query ? (
                  <button onClick={() => setQuery('')} type="button">
                    <X size={15} />
                  </button>
                ) : null}
              </label>

              {renderMenu()}
            </div>

            <aside className="cart-sidebar">{cartPanel('desktop')}</aside>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <img alt="Kimpton Los Monteros Marbella" src={asset('images/logo.png')} />
          </div>
          <div className="site-footer__contact">
            <p>Calle del Lince, Marbella (Málaga) 29603</p>
            <p>Tel. <a href="tel:+34952771700">34952771700</a></p>
            <p><a href="mailto:info@kimptonlosmonteros.com">info@kimptonlosmonteros.com</a></p>
          </div>
          <div className="site-footer__social" aria-label="Social links">
            <a href="https://www.facebook.com/KimptonLosMonteros/" target="_blank" rel="noreferrer" aria-label="Facebook"><img alt="" src={asset('images/social/facebook.svg')} /></a>
            <a href="https://www.instagram.com/kimptonmonteros/" target="_blank" rel="noreferrer" aria-label="Instagram"><img alt="" src={asset('images/social/instagram.svg')} /></a>
            <a href="https://www.linkedin.com/company/kimpton-losmonteros-marbella/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><img alt="" src={asset('images/social/linkedin.svg')} /></a>
            <a href="https://es.pinterest.com/kimptonlosmonteros/" target="_blank" rel="noreferrer" aria-label="Pinterest"><img alt="" src={asset('images/social/pinterest.svg')} /></a>
            <a href="https://www.tiktok.com/@kimpton.losmonteros" target="_blank" rel="noreferrer" aria-label="TikTok"><img alt="" src={asset('images/social/tiktok.svg')} /></a>
          </div>
        </div>

        <div className="site-footer__links">
          <div>
            <a href="tel:+34952771700">Tel. 34952771700</a>
            <a href="https://www.kimptonhotels.com/" target="_blank" rel="noreferrer">About Kimpton Hotels</a>
            <a href="https://www.ihg.com/onerewards/" target="_blank" rel="noreferrer">IHG One Rewards</a>
            <a href="https://www.kimptonhotels.com/blog/" target="_blank" rel="noreferrer">Blog Kimpton: Life is Suite</a>
          </div>
          <div>
            <a href="https://www.kimptonlosmonterosmarbella.com/en/contact-us/" target="_blank" rel="noreferrer">Contact us</a>
            <a href="https://www.ihgplc.com/en/news-and-media" target="_blank" rel="noreferrer">Press Room</a>
            <a href="https://www.ihgplc.com/en/responsible-business" target="_blank" rel="noreferrer">Social Responsibility</a>
            <a href="https://www.kimptonlosmonterosmarbella.com/en/faqs/" target="_blank" rel="noreferrer">FAQs</a>
            <a href="https://careers.ihg.com/" target="_blank" rel="noreferrer">Careers</a>
          </div>
          <div>
            <a href="https://www.ihg.com/content/us/en/about/privacy" target="_blank" rel="noreferrer">Privacy / Legal</a>
            <a href="https://www.ihg.com/content/us/en/about/privacy#your-california-privacy-rights" target="_blank" rel="noreferrer">Your CA Privacy Rights</a>
            <a href="tel:+18555467866">USA: 1-855-KIMPTON (546-7866)</a>
            <a href="https://www.kimptonhotels.com/" target="_blank" rel="noreferrer">kimptonhotels.com</a>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>Kimpton Hotel &amp; Restaurant Group, LLC © 2026</span>
          <strong>IHG One Rewards · Best Price Guarantee</strong>
        </div>
      </footer>

      <button className="mobile-cart-bar" onClick={() => setCartOpen(true)} type="button">
        <ShoppingBag size={18} />
        <span>
          {cartCount} {copy.products}
        </span>
        <strong>{fmt(cartTotal)}</strong>
      </button>

      {cartOpen ? (
        <div className="cart-drawer">
          <button className="cart-drawer__overlay" onClick={() => setCartOpen(false)} type="button" />
          <div className="cart-drawer__panel">
            <button className="cart-drawer__close" onClick={() => setCartOpen(false)} type="button">
              <X size={20} />
            </button>
            {cartPanel('mobile')}
          </div>
        </div>
      ) : null}

      {success ? (
        <div className="success-modal">
          <div className="success-modal__card">
            <div className="success-icon">
              <CheckCircle2 size={34} />
            </div>
            <span>{copy.sent}</span>
            <h2>{copy.sentText}</h2>
            <p>{copy.sentEta}</p>
            <div className="success-total">
              <span>{copy.total}</span>
              <strong>{fmt(cartTotal)}</strong>
            </div>
            <button onClick={resetOrder} type="button">
              {copy.newOrder}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
