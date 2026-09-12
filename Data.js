/* ============================================================
   تقدم - data.js
   بيانات المنهج والأسئلة (الطبقة الوحيدة للبيانات الثابتة)
   ============================================================ */

const SUBJECTS = [
  {
    id: "arabic", name: "اللغة العربية", icon: "📖",
    units: [
      { id: "arabic-u1", name: "الوحدة الأولى", lessons: [
        { id: "arabic-u1-l1", title: "النصوص الأدبية", estimatedMinutes: 30 },
        { id: "arabic-u1-l2", title: "قواعد النحو", estimatedMinutes: 25 },
        { id: "arabic-u1-l3", title: "البلاغة", estimatedMinutes: 20 }
      ]},
      { id: "arabic-u2", name: "الوحدة الثانية", lessons: [
        { id: "arabic-u2-l1", title: "العروض والقافية", estimatedMinutes: 30 },
        { id: "arabic-u2-l2", title: "التعبير والكتابة", estimatedMinutes: 25 }
      ]}
    ]
  },
  {
    id: "islamic", name: "التربية الإسلامية", icon: "🕌",
    units: [
      { id: "islamic-u1", name: "الوحدة الأولى", lessons: [
        { id: "islamic-u1-l1", title: "التفسير", estimatedMinutes: 25 },
        { id: "islamic-u1-l2", title: "الحديث", estimatedMinutes: 25 },
        { id: "islamic-u1-l3", title: "الفقه", estimatedMinutes: 30 }
      ]},
      { id: "islamic-u2", name: "الوحدة الثانية", lessons: [
        { id: "islamic-u2-l1", title: "العقيدة", estimatedMinutes: 25 },
        { id: "islamic-u2-l2", title: "السيرة النبوية", estimatedMinutes: 25 }
      ]}
    ]
  },
  {
    id: "english", name: "اللغة الإنجليزية", icon: "🔤",
    units: [
      { id: "english-u1", name: "Unit 1", lessons: [
        { id: "english-u1-l1", title: "Relative Pronouns", estimatedMinutes: 30 },
        { id: "english-u1-l2", title: "Present Perfect", estimatedMinutes: 25 },
        { id: "english-u1-l3", title: "Vocabulary", estimatedMinutes: 20 }
      ]},
      { id: "english-u2", name: "Unit 2", lessons: [
        { id: "english-u2-l1", title: "Passive Voice", estimatedMinutes: 30 },
        { id: "english-u2-l2", title: "Reading Comprehension", estimatedMinutes: 30 }
      ]}
    ]
  },
  {
    id: "math", name: "الرياضيات", icon: "📐",
    units: [
      { id: "math-u1", name: "الوحدة الأولى", lessons: [
        { id: "math-u1-l1", title: "المعادلات", estimatedMinutes: 30 },
        { id: "math-u1-l2", title: "المتباينات", estimatedMinutes: 25 },
        { id: "math-u1-l3", title: "الدوال", estimatedMinutes: 30 }
      ]},
      { id: "math-u2", name: "الوحدة الثانية", lessons: [
        { id: "math-u2-l1", title: "الهندسة التحليلية", estimatedMinutes: 30 },
        { id: "math-u2-l2", title: "حساب المثلثات", estimatedMinutes: 30 }
      ]}
    ]
  },
  {
    id: "chemistry", name: "الكيمياء", icon: "⚗️",
    units: [
      { id: "chemistry-u1", name: "الوحدة الأولى", lessons: [
        { id: "chemistry-u1-l1", title: "الجدول الدوري", estimatedMinutes: 25 },
        { id: "chemistry-u1-l2", title: "الروابط الكيميائية", estimatedMinutes: 30 },
        { id: "chemistry-u1-l3", title: "التفاعلات", estimatedMinutes: 25 }
      ]},
      { id: "chemistry-u2", name: "الوحدة الثانية", lessons: [
        { id: "chemistry-u2-l1", title: "المحاليل", estimatedMinutes: 25 },
        { id: "chemistry-u2-l2", title: "الأحماض والقواعد", estimatedMinutes: 30 }
      ]}
    ]
  },
  {
    id: "physics", name: "الفيزياء", icon: "🧲",
    units: [
      { id: "physics-u1", name: "الوحدة الأولى", lessons: [
        { id: "physics-u1-l1", title: "قوانين نيوتن", estimatedMinutes: 30 },
        { id: "physics-u1-l2", title: "الحركة", estimatedMinutes: 25 },
        { id: "physics-u1-l3", title: "القوى", estimatedMinutes: 25 }
      ]},
      { id: "physics-u2", name: "الوحدة الثانية", lessons: [
        { id: "physics-u2-l1", title: "الشغل والطاقة", estimatedMinutes: 30 },
        { id: "physics-u2-l2", title: "الزخم", estimatedMinutes: 25 }
      ]}
    ]
  },
  {
    id: "biology", name: "الأحياء", icon: "🧬",
    units: [
      { id: "biology-u1", name: "الوحدة الأولى", lessons: [
        { id: "biology-u1-l1", title: "الخلية", estimatedMinutes: 25 },
        { id: "biology-u1-l2", title: "الانقسام الخلوي", estimatedMinutes: 30 },
        { id: "biology-u1-l3", title: "الوراثة", estimatedMinutes: 30 }
      ]},
      { id: "biology-u2", name: "الوحدة الثانية", lessons: [
        { id: "biology-u2-l1", title: "التصنيف", estimatedMinutes: 25 },
        { id: "biology-u2-l2", title: "البيئة", estimatedMinutes: 25 }
      ]}
    ]
  },
  {
    id: "earth", name: "علوم الأرض والبيئة", icon: "🌍",
    units: [
      { id: "earth-u1", name: "الوحدة الأولى", lessons: [
        { id: "earth-u1-l1", title: "الصخور والمعادن", estimatedMinutes: 25 },
        { id: "earth-u1-l2", title: "الزلازل والبراكين", estimatedMinutes: 25 }
      ]},
      { id: "earth-u2", name: "الوحدة الثانية", lessons: [
        { id: "earth-u2-l1", title: "الطقس والمناخ", estimatedMinutes: 30 },
        { id: "earth-u2-l2", title: "الموارد الطبيعية", estimatedMinutes: 25 }
      ]}
    ]
  },
  {
    id: "computer", name: "الحاسوب", icon: "💻",
    units: [
      { id: "computer-u1", name: "الوحدة الأولى", lessons: [
        { id: "computer-u1-l1", title: "مقدمة في البرمجة", estimatedMinutes: 30 },
        { id: "computer-u1-l2", title: "المتغيرات", estimatedMinutes: 25 }
      ]},
      { id: "computer-u2", name: "الوحدة الثانية", lessons: [
        { id: "computer-u2-l1", title: "الشروط والحلقات", estimatedMinutes: 30 },
        { id: "computer-u2-l2", title: "الدوال", estimatedMinutes: 25 }
      ]}
    ]
  },
  {
    id: "finance", name: "الثقافة المالية", icon: "💰",
    units: [
      { id: "finance-u1", name: "الوحدة الأولى", lessons: [
        { id: "finance-u1-l1", title: "إدارة المصروفات", estimatedMinutes: 25 },
        { id: "finance-u1-l2", title: "الادخار", estimatedMinutes: 25 }
      ]},
      { id: "finance-u2", name: "الوحدة الثانية", lessons: [
        { id: "finance-u2-l1", title: "الاستثمار", estimatedMinutes: 30 }
      ]}
    ]
  },
  {
    id: "vocational", name: "التعليم المهني", icon: "🛠️",
    units: [
      { id: "vocational-u1", name: "الوحدة الأولى", lessons: [
        { id: "vocational-u1-l1", title: "المهارات المهنية", estimatedMinutes: 25 },
        { id: "vocational-u1-l2", title: "السلامة المهنية", estimatedMinutes: 25 }
      ]},
      { id: "vocational-u2", name: "الوحدة الثانية", lessons: [
        { id: "vocational-u2-l1", title: "ريادة الأعمال", estimatedMinutes: 30 }
      ]}
    ]
  }
];

/* بنك الأسئلة - مفتاح كل مجموعة هو lessonId */
const QUESTIONS = {
  "math-u1-l1": [
    { id: "math-u1-l1-q1", topic: "المعادلات",
      question: "ما حل المعادلة 2س + 6 = 14؟",
      options: ["س = 2", "س = 4", "س = 6", "س = 8"], correctIndex: 1,
      explanation: "2س + 6 = 14  ⟹  2س = 8  ⟹  س = 4." },
    { id: "math-u1-l1-q2", topic: "المعادلات",
      question: "حل المعادلة س/3 + 2 = 5 هو:",
      options: ["س = 3", "س = 6", "س = 9", "س = 12"], correctIndex: 2,
      explanation: "س/3 = 3  ⟹  س = 9." },
    { id: "math-u1-l1-q3", topic: "المعادلات",
      question: "أي مما يلي معادلة من الدرجة الأولى؟",
      options: ["س² + 1 = 0", "٢س + ٣ = ٧", "س³ = 8", "√س = 4"], correctIndex: 1,
      explanation: "المعادلة من الدرجة الأولى تحتوي على متغير أسّه 1." }
  ],
  "math-u2-l1": [
    { id: "math-u2-l1-q1", topic: "الهندسة التحليلية",
      question: "ما ميل المستقيم المار بالنقطتين (1, 2) و (3, 6)؟",
      options: ["1", "2", "3", "4"], correctIndex: 1,
      explanation: "الميل = (6 − 2) ÷ (3 − 1) = 4 ÷ 2 = 2." },
    { id: "math-u2-l1-q2", topic: "الهندسة التحليلية",
      question: "معادلة المستقيم الذي ميله 2 ويمر بالنقطة (0, 3) هي:",
      options: ["ص = 2س + 3", "ص = 3س + 2", "ص = −2س + 3", "ص = 2س − 3"], correctIndex: 0,
      explanation: "باستخدام صيغة الميل والمقطع: ص = م س + ب حيث ب = 3." }
  ],
  "physics-u1-l1": [
    { id: "physics-u1-l1-q1", topic: "قوانين نيوتن",
      question: "ينص قانون نيوتن الأول على أن الجسم يبقى على حالته ما لم تؤثر عليه:",
      options: ["قوة داخلية", "قوة خارجية محصلة", "كتلة", "تسارع"], correctIndex: 1,
      explanation: "ينص القانون الأول على بقاء الجسم ساكنًا أو متحركًا بسرعة ثابتة ما لم تؤثر عليه قوة خارجية محصلة." },
    { id: "physics-u1-l1-q2", topic: "قوانين نيوتن",
      question: "قانون نيوتن الثاني يُعبَّر عنه بالعلاقة:",
      options: ["ق = ك × ت", "ق = ك ÷ ت", "ق = ت ÷ ك", "ق = ك × ت²"], correctIndex: 0,
      explanation: "القوة = الكتلة × التسارع." },
    { id: "physics-u1-l1-q3", topic: "قوانين نيوتن",
      question: "قانون نيوتن الثالث ينص على أن لكل فعل:",
      options: ["فعل مساوٍ", "رد فعل مساوٍ ومعاكس", "قوة موازية", "تسارع ثابت"], correctIndex: 1,
      explanation: "لكل فعل رد فعل مساوٍ له في المقدار ومعاكس في الاتجاه." },
    { id: "physics-u1-l1-q4", topic: "قوانين نيوتن",
      question: "وحدة قياس القوة في النظام الدولي هي:",
      options: ["الجول", "النيوتن", "الواط", "الباسكال"], correctIndex: 1,
      explanation: "النيوتن (N) = كجم·م/ث²." }
  ],
  "english-u1-l1": [
    { id: "english-u1-l1-q1", topic: "Relative Pronouns",
      question: "The man ___ lives next door is a doctor.",
      options: ["which", "who", "whose", "whom"], correctIndex: 1,
      explanation: "نستخدم who للعاقل في محل الفاعل." },
    { id: "english-u1-l1-q2", topic: "Relative Pronouns",
      question: "The book ___ I read yesterday was interesting.",
      options: ["who", "whose", "which", "whom"], correctIndex: 2,
      explanation: "نستخدم which لغير العاقل." },
    { id: "english-u1-l1-q3", topic: "Relative Pronouns",
      question: "This is the girl ___ bag was stolen.",
      options: ["who", "which", "whose", "whom"], correctIndex: 2,
      explanation: "whose تُستخدم للملكية." }
  ],
  "chemistry-u1-l1": [
    { id: "chemistry-u1-l1-q1", topic: "الجدول الدوري",
      question: "العنصر الذي رمزه Na هو:",
      options: ["النحاس", "الصوديوم", "النحاس", "النتروجين"], correctIndex: 1,
      explanation: "Na = Natrium أي الصوديوم." },
    { id: "chemistry-u1-l1-q2", topic: "الجدول الدوري",
      question: "العناصر في المجموعة الأولى تُعرف باسم:",
      options: ["الهالوجينات", "الفلزات القلوية", "الغازات النبيلة", "اللافلزات"], correctIndex: 1,
      explanation: "المجموعة الأولى = الفلزات القلوية." },
    { id: "chemistry-u1-l1-q3", topic: "الجدول الدوري",
      question: "عدد الإلكترونات في مستوى الطاقة الأخير لعنصر في المجموعة 17 هو:",
      options: ["1", "3", "5", "7"], correctIndex: 3,
      explanation: "المجموعة 17 (الهالوجينات) تحتوي على 7 إلكترونات في المستوى الأخير." }
  ],
  "biology-u1-l1": [
    { id: "biology-u1-l1-q1", topic: "الخلية",
      question: "العضية المسؤولة عن إنتاج الطاقة في الخلية هي:",
      options: ["النواة", "الميتوكندريا", "الرايبوسوم", "الفجوة"], correctIndex: 1,
      explanation: "الميتوكندريا هي مصنع الطاقة في الخلية." },
    { id: "biology-u1-l1-q2", topic: "الخلية",
      question: "أي مما يلي يوجد في الخلية النباتية ولا يوجد في الحيوانية؟",
      options: ["النواة", "البلاستيدات الخضراء", "الغشاء البلازمي", "السيتوبلازم"], correctIndex: 1,
      explanation: "البلاستيدات الخضراء خاصة بالخلايا النباتية." }
  ],
  "arabic-u1-l2": [
    { id: "arabic-u1-l2-q1", topic: "قواعد النحو",
      question: "الفاعل في جملة «كتبَ الطالبُ الدرسَ» هو:",
      options: ["كتب", "الطالبُ", "الدرسَ", "لا يوجد"], correctIndex: 1,
      explanation: "الفاعل مرفوع، وهو «الطالبُ»." },
    { id: "arabic-u1-l2-q2", topic: "قواعد النحو",
      question: "إعراب كلمة «الدرسَ» في الجملة السابقة:",
      options: ["فاعل", "مفعول به", "حال", "خبر"], correctIndex: 1,
      explanation: "«الدرسَ» مفعول به منصوب." },
    { id: "arabic-u1-l2-q3", topic: "قواعد النحو",
      question: "أي مما يلي فعل ماضٍ؟",
      options: ["يكتب", "اكتب", "كتب", "كاتب"], correctIndex: 2,
      explanation: "«كتب» فعل ماضٍ مبني على الفتح." }
  ],
  "computer-u1-l1": [
    { id: "computer-u1-l1-q1", topic: "أساسيات البرمجة",
      question: "المتغير في البرمجة هو:",
      options: ["قيمة ثابتة", "مساحة لتخزين قيمة قابلة للتغيير", "دالة", "شرط"], correctIndex: 1,
      explanation: "المتغير هو مكان في الذاكرة لتخزين قيمة يمكن تغييرها." },
    { id: "computer-u1-l1-q2", topic: "أساسيات البرمجة",
      question: "أي مما يلي اسم متغير صحيح؟",
      options: ["2name", "my-name", "myName", "my name"], correctIndex: 2,
      explanation: "أسماء المتغيرات لا تبدأ برقم ولا تحتوي مسافة أو رموز خاصة." }
  ]
};
