/* All site wording lives here. POS = faces, dates, images; TEXT.ru / TEXT.en = words, same shape.
   To change a text: edit the string, keep the quotes and commas. */
/* ============ CONTENT ============ */
// Language-independent data: faces, dates, images. Newest position first.
const POS = [
  { face: 'face-02', from: '09 / 2026', to: '01 / 2026', works: [], projects: [] },
  { face: 'face-03', from: '12 / 2025', to: '03 / 2024', works: ['onemoscow-2', 'onemoscow-3', 'onemoscow-5', 'onemoscow-7', 'onemoscow-10'], projects: ['Block-3-popup-01', 'Block-3-popup-02', 'Block-3-popup-03'] },
  { face: 'face-04', from: '02 / 2024', to: '01 / 2022', works: ['nft-1', 'nft-2', 'nft-3', 'nft-5', 'nft-6'], projects: [] },
  { face: 'face-05', from: '12 / 2021', to: '01 / 2021', works: ['quanta-1', 'quanta-2', 'quanta-3', 'quanta-4', 'quanta-5'], projects: [] },
  { face: 'face-06', from: '12 / 2020', to: '01 / 2019', works: ['molodost-2', 'molodost-3', 'molodost-4', 'molodost-5', 'molodost-6'], projects: [] },
  { face: 'face-07', from: '12 / 2018', to: '01 / 2016', works: ['freelance-1', 'freelance-2', 'freelance-3', 'freelance-4'], projects: [] }
];

// All wording. Both languages have exactly the same shape; pos[i] matches POS[i].
// blocks: [title, text] ×4 · works: gallery captions · projects: [description, link label | null = NDA]
const TEXT = {
  ru: {
    ui: {
      title: 'Миша Веревкин — арт-директор и бренд-менеджер', brand: 'миша веревкин',
      nav: { about: 'Про меня', exp: 'Опыт работы', contacts: 'Контакты' },
      navAria: 'Разделы', langAria: 'Язык', menuAria: 'Меню', close: 'Закрыть',
      experience: 'Опыт работы', hint: 'скролл ↓', about: 'Обо мне',
      contactBtn: 'Связаться со мной', more: 'Подробнее',
      projects: 'Примеры реализованных проектов', nda: 'NDA',
      contactsTitle: 'Буду рад лично обсудить, как мой опыт может быть полезен вашей компании',
      call: 'Позвоните мне', tg: 'Напишите мне в телеграм', mail: 'Напишите мне на почту',
      legal: '© 2026 ИП Веревкин Михаил Юрьевич<br>ИНН 110213051859 / ОГРНИП 319112100016679<br><a href="privacy/" >Политика обработки персональных данных</a>'
    },
    intro: {
      name: 'Миша<br>Веревкин',
      p: [
        'Арт-директор и бренд-менеджер с 7+ годами опыта в создании визуальных стратегий для международных брендов и цифровых продуктов — от премиальной недвижимости до цифрового искусства и Web3.',
        'Провожу бренды через полный цикл: от айдентики и брендбуков до диджитал-реализации и ивентов. Руковожу дизайн-командами, выстраиваю процессы, использую AI-инструменты не только для генерации контента, но и для автоматизации рабочих процессов.'
      ]
    },
    pos: [
      { co: 'FOR YOU', kind: 'агентство премиальной недвижимости / Дубай', role: 'Арт-директор',
        did: 'Обновил визуальную структуру бренда и брендбук. Ускорил производство материалов для рассылок, соцсетей и маркетинга, унифицировал внутренние материалы под единый стандарт. Выстроил процессы дизайн-команды и внедрил AI-инструменты для автоматизации рутины',
        blocks: [
          ['Брендинг', 'Обновил визуальную структуру бренда и брендбук. Провел аудит и улучшение сайта, агрегатов и CRM партнёров совместно с внешними подрядчиками — рекомендации по UX/UI'],
          ['Оптимизация', 'Улучшил качество и ускорил производство материалов для рассылок, маркетинга, соцсетей и других диджитал-каналов продвижения. Унифицировал внутренние материалы компании под единый визуальный стандарт'],
          ['Автоматизация', 'Использовал AI-инструменты, включая Claude, для автоматизации и упрощения рабочих процессов'],
          ['Дизайн-команда', 'Выстроил процессы работы дизайн-команды — сократил брак и время на производство материалов, усилил контроль на всех этапах']
        ], works: [], projects: [] },
      { co: 'One Moscow', kind: 'агентство премиальной недвижимости / Москва', role: 'Руководитель дизайн-направления / Бренд-менеджер',
        did: 'Реорганизовал процессы дизайн-команды и сократил сроки на 15–30% за счёт автоматизации. Разработал визуальную стратегию бренда в диджитал, редизайн сайта, брендинг мероприятий и презентаций',
        blocks: [
          ['Дизайн-команда', 'Повысил эффективность работы дизайн-команды за счет реорганизации процессов и внедрения системы проектного управления'],
          ['Оптимизация', 'Сократил время на согласования и рутинные операции (на 15-30%) путем автоматизации и внедрения гайдлайнов'],
          ['Стратегия', 'Полный цикл разработки и внедрения визуальной стратегии, гайдлайнов бренда для digital (сайт, лендинги, SMM, email), презентаций и ивентов'],
          ['Лидерство', 'Участие в разработке бизнес-стратегии, обоснование дизайн-решений на основе данных']
        ],
        works: ['Брендинг', 'Диджитал', 'Ивенты', 'Презентации', 'Мерч'],
        projects: [
          ['Разработал и внедрил новую визуальную стратегию и гайдлайны бренда для диджитал, презентаций и ивентов', null],
          ['Редизайн основного сайта и дополнительных посадочных страниц для продвижения новых направлений', 'Пример проекта'],
          ['Брендинг ивентов различного масштаба (конференции, брокер-туры, корпоративы). Участие во всех этапах, от концепций до реализации', 'Пример']
        ] },
      { co: 'Цифровое искусство & Web 3.0', kind: 'личный бренд / NFT', role: 'Креативный / Коммуникационный дизайнер',
        did: 'Выпустил 2000+ уникальных цифровых работ, собрал 30K+ подписчиков в X. Коллаборации с Jack Butcher и Beeple, выставки NFT NY и NFT Paris',
        blocks: [
          ['Реализация', 'Реализовал более 2000 уникальных цифровых работ в формате серийных коллекций и единичных арт-объектов'],
          ['Личный бренд', 'Создал и развил личный бренд с аудиторией 30K+ в социальных сетях (в основном X/Twitter)'],
          ['Экспертность', 'Укрепил экспертный статус через коллаборации и участие в ключевых событиях индустрии (NFT NY, NFT Paris, Beeple Studio)'],
          ['Партнерства', 'Инициировал и провел совместные проекты с топовыми креаторами (Jack Butcher, VVD, Beeple)']
        ],
        works: ['Выставки — NFT NY', 'Выставки — NFT Paris', 'Коллекции', 'Ивенты', 'Ивенты — Beeple Studio'], projects: [] },
      { co: 'Quanta Costa', kind: 'контент-студия', role: 'Креативный дизайнер / Руководитель проектов',
        did: 'Увеличил органическую видимость брендов клиентов за счёт контент-стратегии. Стандартизировал гайдлайны — +20% к эффективности. Управлял командой из 6+ специалистов',
        blocks: [
          ['Стратегия', 'Увеличил органическую видимость брендов клиентов за счет стратегической оптимизации контента'],
          ['Оптимизация', 'Сократил время на подготовку и запуск новых креативных проектов на 20%, внедрив единые гайдлайны и отлаженные процессы'],
          ['Запуск', 'Вывел бренды клиентов в лидеры поисковой выдачи их категорий через создание премиального и адаптированного контента'],
          ['Управление', 'Руководил командой из 6+ специалистов (дизайнеры, фотографы, видеографы, копирайтеры)']
        ],
        works: ['Фото / видео / графика для брендов', 'Фото / видео / графика для брендов', 'Фото / видео / графика для брендов', 'Фото / видео / графика для брендов', 'Фото / видео / графика для брендов'], projects: [] },
      { co: 'Молодость', kind: 'ивент-агентство', role: 'Креативный дизайнер (event & brand)',
        did: 'Разработал 5+ айдентик ежегодных событий, продакшн для аудитории 50 000+ человек. Координировал мультидисциплинарную команду из 7+ специалистов',
        blocks: [
          ['Разработка', 'Разработал айдентику и комплексные креативные стратегии для 5+ ежегодных событий'],
          ['Производство', 'Руководил производством всего спектра визуальных материалов (от баннеров до цифровых платформ) для мероприятий с совокупной аудиторией более 50 000 человек'],
          ['Оптимизация', 'Оптимизировал процессы производства, сократив количество брака'],
          ['Координация', 'Координация работы мультидисциплинарной команды (7+ специалистов: дизайнеры, копирайтеры, контент-мейкеры) и внешних подрядчиков (типографии, декораторы)']
        ],
        works: ['BURN tour', 'Happy Hour Camp', 'Ивенты', 'Respect my Talent', 'Respect my Talent'], projects: [] },
      { co: 'ИП Веревкин М.Ю.', kind: 'фриланс / брендинг и айдентика', role: 'Креативный / Графический дизайнер',
        did: 'Реализовал 50+ проектов «под ключ»: от исследования и концепции до производства материалов. 30+ бренд-платформ и айдентик',
        blocks: [
          ['Брендинг', 'Разработал бренд-платформы и айдентику для 30+ клиентов из разных сфер'],
          ['Система', 'Внедрил систему управления проектами, позволявшую вести до 5 параллельных проектов без срывов сроков и при сохранении качества'],
          ['Личный бренд', 'Сформировал экспертный личный бренд в социальных сетях, который стал основным каналом привлечения клиентов'],
          ['Аналитика', 'Проведение аудита существующих айдентик и реализация проектов по редизайну, основанных на анализе бизнес-задач и рыночного контекста']
        ],
        works: ['Логофолио', 'Айдентика мебельного производства', 'Интернет-магазин', 'Бизнес-форум Республики Коми'], projects: [] }
    ]
  },

  en: {
    ui: {
      title: 'Misha Verevkin — Art Director & Brand Manager', brand: 'misha verevkin',
      nav: { about: 'About', exp: 'Experience', contacts: 'Contacts' },
      navAria: 'Sections', langAria: 'Language', menuAria: 'Menu', close: 'Close',
      experience: 'Experience', hint: 'scroll ↓', about: 'About',
      contactBtn: 'Get in touch', more: 'Details',
      projects: 'Selected projects', nda: 'NDA',
      contactsTitle: 'I’d be glad to talk about how my experience can help your company',
      call: 'Call me', tg: 'Message me on Telegram', mail: 'Email me',
      legal: '© 2026 Individual Entrepreneur Mikhail Verevkin<br>INN 110213051859 / OGRNIP 319112100016679<br><a href="privacy/" >Privacy policy (in Russian)</a>'
    },
    intro: {
      name: 'Misha<br>Verevkin',
      p: [
        'Art director and brand manager with 7+ years of experience building visual strategies for international brands and digital products — from premium real estate to digital art and Web3.',
        'I take brands through the full cycle, from identity and brand books to digital execution and events. I lead design teams, build processes, and use AI tools not just to generate content but to automate workflows.'
      ]
    },
    pos: [
      { co: 'FOR YOU', kind: 'premium real estate agency / Dubai', role: 'Art Director',
        did: 'Refreshed the brand’s visual structure and brand book. Sped up production of email, social and marketing materials and brought internal materials under a single standard. Built the design team’s processes and introduced AI tools to automate routine work',
        blocks: [
          ['Branding', 'Refreshed the brand’s visual structure and brand book. Audited and improved the website, listing platforms and partner CRM together with external contractors, with UX/UI recommendations'],
          ['Optimization', 'Raised quality and sped up production of materials for email, marketing, social media and other digital channels. Brought the company’s internal materials under a single visual standard'],
          ['Automation', 'Used AI tools, including Claude, to automate and simplify workflows'],
          ['Design team', 'Set up the design team’s workflow: fewer errors, shorter production times and tighter control at every stage']
        ], works: [], projects: [] },
      { co: 'One Moscow', kind: 'premium real estate agency / Moscow', role: 'Head of Design / Brand Manager',
        did: 'Reorganized the design team’s processes and cut lead times by 15–30% through automation. Developed the brand’s digital visual strategy, redesigned the website, branded events and presentations',
        blocks: [
          ['Design team', 'Made the design team more efficient by reorganizing processes and introducing a project management system'],
          ['Optimization', 'Cut time spent on approvals and routine tasks by 15–30% through automation and guidelines'],
          ['Strategy', 'Full-cycle development and rollout of the visual strategy and brand guidelines for digital (website, landing pages, SMM, email), presentations and events'],
          ['Leadership', 'Contributed to business strategy and backed design decisions with data']
        ],
        works: ['Branding', 'Digital', 'Events', 'Presentations', 'Merch'],
        projects: [
          ['Developed and rolled out a new visual strategy and brand guidelines for digital, presentations and events', null],
          ['Redesign of the main website and additional landing pages promoting new business lines', 'View project'],
          ['Branding for events of every scale (conferences, broker tours, corporate parties), from concept to delivery', 'View example']
        ] },
      { co: 'Digital Art & Web 3.0', kind: 'personal brand / NFT', role: 'Creative / Communication Designer',
        did: 'Released 2,000+ unique digital works and grew an audience of 30K+ on X. Collaborated with Jack Butcher and Beeple; exhibited at NFT NY and NFT Paris',
        blocks: [
          ['Output', 'Released more than 2,000 unique digital works as serial collections and one-off art pieces'],
          ['Personal brand', 'Built and grew a personal brand with an audience of 30K+ on social media (mainly X/Twitter)'],
          ['Expertise', 'Strengthened my standing through collaborations and key industry events (NFT NY, NFT Paris, Beeple Studio)'],
          ['Partnerships', 'Initiated and delivered joint projects with leading creators (Jack Butcher, VVD, Beeple)']
        ],
        works: ['Exhibitions — NFT NY', 'Exhibitions — NFT Paris', 'Collections', 'Events', 'Events — Beeple Studio'], projects: [] },
      { co: 'Quanta Costa', kind: 'content studio', role: 'Creative Designer / Project Lead',
        did: 'Increased clients’ organic brand visibility through content strategy. Standardized guidelines for a 20% efficiency gain. Managed a team of 6+ specialists',
        blocks: [
          ['Strategy', 'Increased clients’ organic brand visibility through strategic content optimization'],
          ['Optimization', 'Cut the time to prepare and launch new creative projects by 20% with unified guidelines and streamlined processes'],
          ['Launch', 'Took client brands to the top of search results in their categories with premium, tailored content'],
          ['Management', 'Led a team of 6+ specialists (designers, photographers, videographers, copywriters)']
        ],
        works: ['Photo / video / graphics for brands', 'Photo / video / graphics for brands', 'Photo / video / graphics for brands', 'Photo / video / graphics for brands', 'Photo / video / graphics for brands'], projects: [] },
      { co: 'Molodost', kind: 'event agency', role: 'Creative Designer (event & brand)',
        did: 'Created identities for 5+ annual events and produced materials for audiences of 50,000+. Coordinated a multidisciplinary team of 7+ specialists',
        blocks: [
          ['Development', 'Created identities and comprehensive creative strategies for 5+ annual events'],
          ['Production', 'Led production of the full range of visual materials, from banners to digital platforms, for events with a combined audience of 50,000+'],
          ['Optimization', 'Streamlined production processes and reduced defects'],
          ['Coordination', 'Coordinated a multidisciplinary team (7+ designers, copywriters and content creators) and external contractors (printers, set decorators)']
        ],
        works: ['BURN tour', 'Happy Hour Camp', 'Events', 'Respect my Talent', 'Respect my Talent'], projects: [] },
      { co: 'Independent practice', kind: 'freelance / branding & identity', role: 'Creative / Graphic Designer',
        did: 'Delivered 50+ end-to-end projects, from research and concept to production. 30+ brand platforms and identities',
        blocks: [
          ['Branding', 'Developed brand platforms and identities for 30+ clients across industries'],
          ['Workflow', 'Set up a project management system to run up to 5 projects in parallel without missed deadlines or loss of quality'],
          ['Personal brand', 'Built an expert personal brand on social media that became my main source of clients'],
          ['Analysis', 'Audited existing identities and delivered redesigns grounded in business goals and market context']
        ],
        works: ['Logofolio', 'Furniture manufacturer identity', 'Online store', 'Komi Republic business forum'], projects: [] }
    ]
  }
};
