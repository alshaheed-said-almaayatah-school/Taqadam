// ============================================================
// بيانات المنهاج الأردني الرسمي
// الصف العاشر - الفصل الأول - جيل 2011
// المصدر: المركز الوطني لتطوير المناهج - وزارة التربية والتعليم
// ============================================================

const CURRICULUM_DATA = {
    // معلومات عامة عن المنهاج
    meta: {
        country: 'الأردن',
        grade: 10,
        grade_name: 'الصف العاشر',
        semester: 1,
        semester_name: 'الفصل الدراسي الأول',
        generation: 2011,
        curriculum: 'المنهاج الأردني',
        source: 'المركز الوطني لتطوير المناهج',
        total_subjects: 11,
        total_units: 35,
        total_lessons: 136
    },

    subjects: [
        // ============================================================
        // 1. اللغة العربية
        // ============================================================
        {
            id: 1,
            name: 'اللغة العربية',
            code: 'ARA10-1',
            grade: 10,
            semester: 1,
            units: [
                {
                    unit_number: 1,
                    name: 'مِنْ أَدَبِ الإغْيَادِرِ',
                    lessons: [
                        'أستمع بانتباه وتركيز',
                        'أتحدث بطلاقة: التعبير عن موقف',
                        'أقرأ بطلاقة وفهم: (آيات كريمة من الذكر الحكيم)',
                        'أكتب محتوى: الرسالة الشخصية الإلكترونية',
                        'أبني لغتي: (1) أسلوب الشرط - (2) الأسلوب الخبري'
                    ]
                },
                {
                    unit_number: 2,
                    name: 'يَرْحَلُونَ وَيَبْقَى',
                    lessons: [
                        'العرض التقديمي',
                        'إلى الصامدين غرب النهر',
                        'تحليل النص الشعري',
                        'أسلوب النداء',
                        '(2) الأسلوب الإنشائي (الإنشاء الطلبي)'
                    ]
                },
                {
                    unit_number: 3,
                    name: 'مختارات من الأدب المترجم',
                    lessons: [
                        'قراءة الصورة',
                        'اللغة الأم',
                        'تحليل لوحة فنية',
                        'معاني الأفعال المزيدية',
                        '(2) الأسلوب الإنشائي (الإنشاء غير الطلبي)'
                    ]
                },
                {
                    unit_number: 4,
                    name: 'من السيرة الذاتية',
                    lessons: [
                        'أستمع بانتباه وتركيز',
                        'كيف أقدم شخصية أديبة؟',
                        'أقرأ بطلاقة وفهم: شغف القراءة وحكايات أخرى',
                        'أكتب محتوى: صفحة أولى من سيرتي الذاتية',
                        'أبني لغتي: (1) مصادر الأفعال الثلاثية - (2) موسيقا لغتي وإيقاعها'
                    ]
                },
                {
                    unit_number: 5,
                    name: 'من الأدب القديم',
                    lessons: [
                        'قراءة المشاعر',
                        'بم التعلل لا أهل ولا وطن',
                        'نص إخباري عن مناسبة أمسي'
                    ]
                }
            ]
        },

        // ============================================================
        // 2. التربية الإسلامية
        // ============================================================
        {
            id: 2,
            name: 'التربية الإسلامية',
            code: 'ISL10-1',
            grade: 10,
            semester: 1,
            units: [
                {
                    unit_number: 1,
                    name: '﴿إِنَّ اللَّهَ يُحِبُّ الْمُقْسِطِينَ﴾',
                    lessons: [
                        'واجب المسلم تجاه القرآن الكريم',
                        'البيع: مشروعيته، وأحكامه',
                        'معاملة النبي ﷺ ليهود المدينة المنورة',
                        'علامات وقف التلاوة',
                        'حق التملّك',
                        'من صور عناية الإسلام بالمرأة (حمايتها من العنف)'
                    ]
                },
                {
                    unit_number: 2,
                    name: '﴿رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ﴾',
                    lessons: [
                        'سورة البقرة: الآيتان الكريمتان (143-144)',
                        'علم أصول الفقه',
                        'مراتب الدين',
                        'أحكام وقف التلاوة',
                        'من مقاصد الشريعة (حفظ الدين)',
                        'الحديث الشريف: (حفظ اللسان)'
                    ]
                },
                {
                    unit_number: 3,
                    name: '﴿ت',
ِلْكَ حُدُودُ اللَّهِ﴾',
                    lessons: [
                        'الآيات الكريمات                        (183-186) من سورة البق 'رة',
                        'الربا وأحكامهالق في الفقه الإسلامي',
                        'المسجدرض الأقصى المبارك',
                        'من أنواع الوقف الاختياري الجائز (الوقف التام)',
                        'القيادة الهاشمية ودورها في إبراز صورة الإسلام وأحكامه في الفقه الإسلامي'
                    ]
                },
                {
                    unit_number: 4,
                    name: '﴿وَيُعَلِّمُكُمُ اللَّهُ﴾',
                    lessons: [
                        'التفكر في خلق الله تعالى',
                        'صحيح البخاري',
                        'القمار وأحكامه في الفقه الإسلامي',
                        'من أنواع الوقف الاختياري الجائز (الوقف الكافي)',
                        'الصحابي الجليل خالد بن الوليد رضي الله عنه',
                        'الحياة زينة الإنسان'
                    ]
                }
            ]
        },

        // ============================================================
        // 3. اللغة الإنجليزية
        // ============================================================
        {
            id: 3,
            name: 'اللغة الإنجليزية',
            code: 'ENG10-1',
            grade: 10,
            semester: 1,
            units: [
                {
                    unit_number: 1,
                    name: 'Looking Good',
                    lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
                },
                {
                    unit_number: 2,
                    name: 'The Digital Mind',
                    lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
                },
                {
                    unit_number: 3,
                    name: 'Active and Healthy',
                    lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
                },
                {
                    unit_number: 4,
                    name: 'Time to Move',
                    lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
                },
                {
                    unit_number: 5,
                    name: 'The Next Step',
                    lessons: ['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4']
                }
            ]
        },

        // ============================================================
        // 4. الرياضيات
        // ============================================================
        {
            id: 4,
            name: 'الرياضيات',
            code: 'MATH10-1',
            grade: 10,
            semester: 1,
            units: [
                {
                    unit_number: 1,
                    name: 'الأسس والمعادلات',
                    lessons: [
                        'حل نظام معادلة خطية وتربيعية',
                        'حل نظام معادلتين تربيعيتين',
                        'تبسيط المقادير الأسية',
                        'حل المعادلة الأسية'
                    ]
                },
                {
                    unit_number: 2,
                    name: 'الدائرة',
                    lessons: [
                        'أوتار الدائرة، وأقطارها، ومماساتها',
                        'الأقواس والقطاعات الدائرية',
                        'الزوايا في الدائرة',
                        'معادلة الدائرة',
                        'الدوائر المتماسة'
                    ]
                }
            ]
        },

        // ============================================================
        // 5. الكيمياء
        // ============================================================
        {
            id: 5,
            name: 'الكيمياء',
            code: 'CHEM10-1',
            grade: 10,
            semester: 1,
            units: [
                {
                    unit_number: 1,
                    name: 'بنية الذرّة وتركيبها',
                    lessons: [
                        'نظرية بور للذرة الهيدروجين',
                        'النموذج الميكانيكي الموجي للذرة'
                    ]
                },
                {
                    unit_number: 2,
                    name: 'التوزيع الإلكتروني والدورية',
                    lessons: ['التوزيع الإلكتروني']
                },
                {
                    unit_number: 3,
                    name: 'المركبات والروابط الكيميائية',
                    lessons: ['المركبات والروابط الكيميائية']
                }
            ]
        },

        // ============================================================
        // 6. الفيزياء
        // ============================================================
        {
            id: 6,
            name: 'الفيزياء',
            code: 'PHY10-1',
            grade: 10,
            semester: 1,
            units: [
                {
                    unit_number: 1,
                    name: 'المُتَّجِهَات',
                    lessons: [
                        'الكميات القياسية والكميات المتجهة',
                        'جمع المتجهات وطرحها'
                    ]
                },
                {
                    unit_number: 2,
                    name: 'الحركة',
                    lessons: [
                        'الحركة في بُعد واحد',
                        'الحركة في بُعدين'
                    ]
                },
                {
                    unit_number: 3,
                    name: 'القوى',
                    lessons: [
                        'القصور الذاتي',
                        'القانون الأول في الحركة لنيوتن',
                        'القانون الثاني والثالث في الحركة لنيوتن'
                    ]
                }
            ]
        },

        // ============================================================
        // 7. الأحياء / العلوم الحياتية
        // ============================================================
        {
            id: 7,
            name: 'الأحياء / العلوم الحياتية',
            code: 'BIO10-1',
            grade: 10,
            semester: 1,
            units: [
                {
                    unit_number: 1,
                    name: 'نظرية التطور',
                    lessons: ['تطور الكائنات الحية']
                },
                {
                    unit_number: 2,
                    name: 'الفيروسات والبروتينات',
                    lessons: [
                        'الفيروسات',
                        'الفيروسات والبروتينات'
                    ]
                },
                {
                    unit_number: 3,
                    name: 'تصنيف الكائنات الحية',
                    lessons: [
                        'أسس علم التصنيف',
                        'البكتيريا والأثريات',
                        'الطلائعيات',
                        'الفطريات'
                    ]
                }
            ]
        },

        // ============================================================
        // 8. علوم الأرض والبيئة
        // ============================================================
        {
            id: 8,
            name: 'علوم الأرض والبيئة',
            code: 'EARTH10-1',
            grade: 10,
            semester: 1,
            units: [
                {
                    unit_number: 1,
                    name: 'الصخور',
                    lessons: [
                        'الصخور النارية',
                        'الصخور الرسوبية',
                        'الصخور المتحولة'
                    ]
                },
                {
                    unit_number: 2,
                    name: 'النجوم',
                    lessons: [
                        'ماهية النجوم',
                        'الأنظمة النجمية والكوكبات',
                        'دورة حياة النجوم'
                    ]
                }
            ]
        },

        // ============================================================
        // 9. التربية المهنية
        // ============================================================
        {
            id: 9,
            name: 'التربية المهنية',
            code: 'VOC10-1',
            grade: 10,
            semester: 1,
            units: [
                {
                    unit_number: 1,
                    name: 'حالات مَرَضية',
                    lessons: [
                        'مرض السكري (١)',
                        'ضغط الدم',
                        'الاضطراب التشنجي'
                    ]
                },
                {
                    unit_number: 2,
                    name: 'مشروعات اقتصادية',
                    lessons: [
                        'المشروعات الاقتصادية الصغيرة',
                        'مشروعات إنتاجية زراعية صغيرة',
                        'تصنيع منتجات الألبان'
                    ]
                },
                {
                    unit_number: 3,
                    name: 'الأعمال التطوعية في خدمة المجتمع',
                    lessons: ['العمل التطوعي']
                },
                {
                    unit_number: 4,
                    name: 'المهن',
                    lessons: [
                        'خياطة الملابس',
                        'أعمال الدهان'
                    ]
                }
            ]
        },

        // ============================================================
        // 10. المهارات الرقمية
        // ============================================================
        {
            id: 10,
            name: 'المهارات الرقمية',
            code: 'DIG10-1',
            grade: 10,
            semester: 1,
            units: [
                {
                    unit_number: 1,
                    name: 'تحليل البيانات',
                    lessons: [
                        'البيانات والمعلومات',
                        'البيانات والمعلومات والمعرفة',
                        'تمثيل البيانات داخل نظام الحاسوب',
                        'أنواع البيانات وطرائق تنظيمها',
                        'مصادر البيانات وطرائق جمعها',
                        'أهمية البيانات في اتخاذ القرارات',
                        'تنظيم البيانات',
                        'التمثيل المرئي للبيانات',
                        'البيانات الضخمة وطرائق تحليلها',
                        'عمليات معالجة البيانات الضخمة',
                        'أدوات التمثيل المرئي للبيانات',
                        'التمثيل التفاعلي للبيانات',
                        'تحليل البيانات',
                        'تحليل البيانات باستخدام Excel'
                    ]
                },
                {
                    unit_number: 2,
                    name: 'الخوارزميات والبرمجة',
                    lessons: [
                        'مقدمة إلى المواقع الإلكترونية',
                        'إنشاء الصفحات الإلكترونية',
                        'الوسائط المتعددة والارتباطات التشعبية'
                    ]
                }
            ]
        },

        // ============================================================
        // 11. الثقافة المالية
        // ============================================================
        {
            id: 11,
            name: 'الثقافة المالية',
            code: 'FIN10-1',
            grade: 10,
            semester: 1,
            units: [
                {
                    unit_number: 1,
                    name: 'الخطر والتأمين',
                    lessons: [
                        'مفهوم الخطر',
                        'أركان الخطر',
                        'مسببات الخطر',
                        'مفهوم التأمين',
                        'أنواع التأمين',
                        'شركات التأمين في الأردن'
                    ]
                },
                {
                    unit_number: 2,
                    name: 'المدفوعات الإلكترونية',
                    lessons: [
                        'نظام إي فواتيركم (eFAWATEERcom)',
                        'المحفظة الإلكترونية (JOMOPay)',
                        'مقدمو خدمة الدفع',
                        'حقوق مستخدمي المحفظة الإلكترونية وواجباتهم'
                    ]
                }
            ]
        }
    ]
};

// ============================================================
// دوال مساعدة للتعامل مع البيانات
// ============================================================

/**
 * الحصول على جميع الدروس مع تفاصيلها الكاملة
 */
function getAllLessons() {
    const all = [];
    CURRICULUM_DATA.subjects.forEach(subject => {
        subject.units.forEach(unit => {
            unit.lessons.forEach((lessonName, index) => {
                all.push({
                    subject_id: subject.id,
                    subject_name: subject.name,
                    subject_code: subject.code,
                    unit_number: unit.unit_number,
                    unit_name: unit.name,
                    lesson_number: index + 1,
                    lesson_name: lessonName,
                    lesson_id: `${subject.id}-${unit.unit_number}-${index + 1}`
                });
            });
        });
    });
    return all;
}

/**
 * الحصول على إجمالي عدد الدروس
 */
function getTotalLessons() {
    return getAllLessons().length;
}

/**
 * الحصول على مادة بواسطة المعرف
 */
function getSubjectById(id) {
    return CURRICULUM_DATA.subjects.find(s => s.id === id);
}

/**
 * الحصول على وحدات مادة معينة
 */
function getSubjectUnits(subjectId) {
    const subject = getSubjectById(subjectId);
    return subject ? subject.units : [];
}

/**
 * الحصول على دروس وحدة معينة
 */
function getUnitLessons(subjectId, unitNumber) {
    const units = getSubjectUnits(subjectId);
    const unit = units.find(u => u.unit_number === unitNumber);
    return unit ? unit.lessons : [];
}

/**
 * الحصول على اسم درس محدد
 */
function getLessonName(subjectId, unitNumber, lessonNumber) {
    const lessons = getUnitLessons(subjectId, unitNumber);
    return lessons[lessonNumber - 1] || null;
}

/**
 * الحصول على عدد وحدات مادة
 */
function getSubjectUnitsCount(subjectId) {
    return getSubjectUnits(subjectId).length;
}

/**
 * الحصول على عدد دروس مادة
 */
function getSubjectLessonsCount(subjectId) {
    const units = getSubjectUnits(subjectId);
    return units.reduce((sum, unit) => sum + unit.lessons.length, 0);
}

/**
 * الحصول على إحصائيات المنهاج الكاملة
 */
function getCurriculumStats() {
    let totalUnits = 0;
    let totalLessons = 0;
    
    CURRICULUM_DATA.subjects.forEach(subject => {
        totalUnits += subject.units.length;
        subject.units.forEach(unit => {
            totalLessons += unit.lessons.length;
        });
    });
    
    return {
        totalSubjects: CURRICULUM_DATA.subjects.length,
        totalUnits: totalUnits,
        totalLessons: totalLessons,
        subjectsStats: CURRICULUM_DATA.subjects.map(s => ({
            id: s.id,
            name: s.name,
            units: s.units.length,
            lessons: s.units.reduce((sum, u) => sum + u.lessons.length, 0)
        }))
    };
}

/**
 * البحث عن درس بواسطة المعرف
 */
function getLessonById(lessonId) {
    return getAllLessons().find(l => l.lesson_id === lessonId) || null;
}

/**
 * الحصول على الدرس التالي في المنهاج
 */
function getNextLesson(currentLessonId) {
    const allLessons = getAllLessons();
    const currentIndex = allLessons.findIndex(l => l.lesson_id === currentLessonId);
    if (currentIndex === -1 || currentIndex === allLessons.length - 1) {
        return null;
    }
    return allLessons[currentIndex + 1];
}

/**
 * الحصول على الدرس السابق في المنهاج
 */
function getPreviousLesson(currentLessonId) {
    const allLessons = getAllLessons();
    const currentIndex = allLessons.findIndex(l => l.lesson_id === currentLessonId);
    if (currentIndex <= 0) {
        return null;
    }
    return allLessons[currentIndex - 1];
}

// ============================================================
// تصدير البيانات للاستخدام في ملفات أخرى
// ============================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CURRICULUM_DATA,
        getAllLessons,
        getTotalLessons,
        getSubjectById,
        getSubjectUnits,
        getUnitLessons,
        getLessonName,
        getSubjectUnitsCount,
        getSubjectLessonsCount,
        getCurriculumStats,
        getLessonById,
        getNextLesson,
        getPreviousLesson
    };
}
