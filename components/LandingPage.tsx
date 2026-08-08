import React, { useState } from 'react';
import cashierImg from '../src/assets/images/1.png';
import ordersImg from '../src/assets/images/2.png';
import inventoryImg from '../src/assets/images/3.png';
import accountsImg from '../src/assets/images/4.png';
import { 
  Sparkles, 
  CheckCircle2, 
  Shirt, 
  ShieldCheck, 
  Zap, 
  MessageCircle, 
  Plus, 
  Minus, 
  Calculator, 
  Send, 
  Crown, 
  Building2, 
  Printer, 
  BarChart3, 
  Store, 
  ChevronDown, 
  ChevronUp, 
  LogIn, 
  LayoutDashboard, 
  FileText, 
  Layers, 
  Users, 
  ArrowLeft,
  Check,
  Menu,
  X
} from 'lucide-react';
import { Order } from '../types';

interface LandingPageProps {
  onOpenAuth: () => void;
  onGoToDashboard?: () => void;
  isLoggedIn?: boolean;
  orders?: Order[];
}

const LAUNDRY_ITEMS = [
  { id: 'thobe', name: 'ثوب رجالي فاخر', price: 5, icon: '👕', category: 'ملابس رجالية' },
  { id: 'shemagh', name: 'غترة / شماغ', price: 3, icon: '🧣', category: 'ملابس رجالية' },
  { id: 'shirt', name: 'قميص / تيشرت', price: 4, icon: '👔', category: 'ملابس رجالية' },
  { id: 'pants', name: 'بنطلون / جينز', price: 4, icon: '👖', category: 'ملابس رجالية' },
  { id: 'dress', name: 'فستان سهرة / مناسبات', price: 15, icon: '👗', category: 'ملابس نسائية' },
  { id: 'suit', name: 'بدلة كاملة / بليزر', price: 15, icon: '🤵', category: 'رسميات' },
  { id: 'blanket', name: 'بطانية / مفرش سرير', price: 25, icon: '🛌', category: 'مفارش' },
  { id: 'carpet', name: 'سجادة فاخرة', price: 30, icon: '🧶', category: 'مفارش' },
];

const FAQS = [
  {
    question: 'ما هي منصة إدارة المغاسل؟',
    answer: 'هي نظام سحابي مخصص لأصحاب المغاسل يتيح إدارة عمليات الكاشير، إشعارات الواتساب، طباعة ملصقات الباركود، الفواتير الإلكترونية المعتمدة، والمخزون من أي جهاز بكل سهولة.'
  },
  {
    question: 'هل النظام متوافق مع هيئة الزكاة والضريبة والجمارك (الفاتورة الإلكترونية)؟',
    answer: 'نعم، المنصة تصدر فواتير حرارية وإلكترونية محوسبة تتضمن رمز الاستجابة السريع (QR Code) ونسبة ضريبة القيمة المضافة 15% بحسب المتطلبات المعتمدة.'
  },
  {
    question: 'كيف تعمل خدمة إشعارات الواتساب التلقائية للعملاء؟',
    answer: 'بمجرد إدخال الطلب عبر الكاشير أو تحديث حالته إلى (جاهز للاستلام)، يرسل النظام تلقائياً رسالة واتساب للعميل تحتوي على تفاصيل الفاتورة والمبلغ والموعد.'
  },
  {
    question: 'هل نحتاج إلى شراء أجهزة كاشير معقدة ومكلفة؟',
    answer: 'لا، يعمل النظام سحابياً على أي جهاز كمبيوتر، آيباد، تابلت، أو جوال ذكي، مع إمكانية الربط السهل بأي طابعة فواتير حرارية.'
  },
  {
    question: 'ما الفرق بين الاشتراك السنوي والشهري؟',
    answer: 'عند اختيار الاشتراك السنوي تحصل على خصم خاص 20%، وتستفيد من استقرار السعر والربط الكامل للواتساب دون أي مصاريف خفية.'
  },
  {
    question: 'هل توجد فترة تجريبية مجانية للمغسلة؟',
    answer: 'نعم، يمكنك التسجيل وتجربة نظام الكاشير ولوحة التحكم مجاناً للتعرف على كافة الخصائص قبل تأكيد الاشتراك.'
  }
];

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenAuth,
  onGoToDashboard,
  isLoggedIn = false
}) => {
  // Calculator state
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({
    thobe: 4,
    shemagh: 2,
    dress: 1
  });
  const [isUrgent, setIsUrgent] = useState(false);
  const [extraOud, setExtraOud] = useState(true);

  // Single Subscription Pricing Toggle state ('yearly' | 'monthly')
  const [billingCycle, setBillingCycle] = useState<'yearly' | 'monthly'>('yearly');

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Mobile navigation menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Calculate total for calculator
  const calculateTotals = () => {
    let subtotal = 0;
    (Object.entries(selectedItems) as [string, number][]).forEach(([id, qty]) => {
      const item = LAUNDRY_ITEMS.find(i => i.id === id);
      if (item && qty > 0) {
        subtotal += item.price * qty;
      }
    });

    if (isUrgent) subtotal *= 1.5;
    if (extraOud) subtotal += 10;

    const tax = subtotal * 0.15;
    const total = subtotal + tax;

    return { subtotal, tax, total };
  };

  const totals = calculateTotals();

  const handleQtyChange = (id: string, delta: number) => {
    setSelectedItems(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const sendCalculatorWhatsApp = () => {
    const itemList = (Object.entries(selectedItems) as [string, number][])
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => {
        const item = LAUNDRY_ITEMS.find(i => i.id === id);
        return `• ${item?.name}: ${qty} قطعة`;
      })
      .join('\n');

    const msg = `مرحباً منصة إدارة المغاسل 👋\nأود استفسار عن طلب الكاشير التالي:\n\n${itemList}\n\nنوع الخدمة: ${isUrgent ? 'مستعجل ⚡' : 'عادي ⏱️'}\nتعطير عود ملكي: ${extraOud ? 'نعم ✨' : 'بدون'}\nالإجمالي المقدر: ${totals.total.toFixed(2)} ر.س`;

    const url = `https://wa.me/966500000000?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-500 selection:text-white" dir="rtl" style={{ fontFamily: "'Tajawal', sans-serif" }}>
      
      {/* Top Announcement Bar */}
      <div className="bg-indigo-950 text-indigo-200 text-xs py-2.5 px-4 text-center font-bold flex items-center justify-center gap-2 border-b border-indigo-800/50">
        <span className="bg-amber-400 text-indigo-950 text-[10px] px-2.5 py-0.5 rounded-full font-black animate-pulse shadow-sm">نظام سحابي متكامل</span>
        <span>المنصة الذكية لإدارة المغاسل، الكاشير السريع، وإشعارات الواتساب الآلية 🚀</span>
      </div>

      {/* Main Header Nav */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-950 to-indigo-900 text-amber-400 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-950/20 border border-indigo-800 shrink-0">
              <Building2 className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-indigo-950 leading-tight flex items-center gap-1.5">
                منصة غسيل كلاود
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" />
              </h1>
              <p className="text-[10px] sm:text-[11px] font-bold text-slate-500">النظام السحابي للكاشير والفواتير</p>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-black text-slate-600">
            <a href="#hero" className="hover:text-indigo-600 transition-colors">الرئيسية</a>
            <a href="#features" className="hover:text-indigo-600 transition-colors">مميزات المنصة</a>
            <a href="#screens-showcase" className="hover:text-indigo-600 transition-colors">استعراض الشاشات</a>
            <a href="#pricing" className="hover:text-amber-600 transition-colors text-amber-600 font-extrabold flex items-center gap-1">
              <Crown size={14} className="text-amber-500" />
              باقة الاشتراك
            </a>
            <a href="#faq" className="hover:text-indigo-600 transition-colors">الأسئلة الشائعة</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-3">
              {isLoggedIn && onGoToDashboard ? (
                <button
                  onClick={onGoToDashboard}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs shadow-md shadow-indigo-200 transition-all flex items-center gap-2 active:scale-95"
                >
                  <LayoutDashboard size={16} />
                  لوحة التحكم والكاشير
                </button>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="px-5 py-2.5 bg-indigo-950 hover:bg-indigo-900 text-white rounded-2xl font-black text-xs shadow-md transition-all flex items-center gap-2 active:scale-95"
                >
                  <LogIn size={16} className="text-amber-400" />
                  دخول الكاشير والمنصة
                </button>
              )}

              <a
                href="https://wa.me/966500000000"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-2xl transition-all border border-emerald-200"
                title="تواصل مع دعم المنصة عبر الواتساب"
              >
                <MessageCircle size={20} />
              </a>
            </div>

            {/* Mobile Navigation Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 bg-slate-100 hover:bg-slate-200 text-indigo-950 rounded-2xl border border-slate-200 transition-all flex items-center justify-center shrink-0 active:scale-95"
              aria-label="قائمة الملاحة"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col space-y-2 font-black text-xs text-slate-700 border-b border-slate-100 pb-4">
              <a 
                href="#hero" 
                onClick={() => setMobileMenuOpen(false)} 
                className="p-3 hover:bg-indigo-50/60 rounded-2xl transition-colors flex items-center justify-between text-slate-800"
              >
                <span>الرئيسية</span>
                <ArrowLeft size={16} className="text-slate-400" />
              </a>
              <a 
                href="#features" 
                onClick={() => setMobileMenuOpen(false)} 
                className="p-3 hover:bg-indigo-50/60 rounded-2xl transition-colors flex items-center justify-between text-slate-800"
              >
                <span>مميزات المنصة</span>
                <ArrowLeft size={16} className="text-slate-400" />
              </a>
              <a 
                href="#screens-showcase" 
                onClick={() => setMobileMenuOpen(false)} 
                className="p-3 hover:bg-indigo-50/60 rounded-2xl transition-colors flex items-center justify-between text-slate-800"
              >
                <span>استعراض الشاشات</span>
                <ArrowLeft size={16} className="text-slate-400" />
              </a>
              <a 
                href="#pricing" 
                onClick={() => setMobileMenuOpen(false)} 
                className="p-3 bg-amber-50 text-amber-900 rounded-2xl transition-colors flex items-center justify-between font-extrabold"
              >
                <span className="flex items-center gap-1.5">
                  <Crown size={16} className="text-amber-500" />
                  باقة الاشتراك السنوية
                </span>
                <ArrowLeft size={16} className="text-amber-600" />
              </a>
              <a 
                href="#faq" 
                onClick={() => setMobileMenuOpen(false)} 
                className="p-3 hover:bg-indigo-50/60 rounded-2xl transition-colors flex items-center justify-between text-slate-800"
              >
                <span>الأسئلة الشائعة</span>
                <ArrowLeft size={16} className="text-slate-400" />
              </a>
            </nav>

            <div className="space-y-2.5 pt-1">
              {isLoggedIn && onGoToDashboard ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onGoToDashboard();
                  }}
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <LayoutDashboard size={18} />
                  لوحة التحكم والكاشير
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full py-3.5 bg-indigo-950 hover:bg-indigo-900 text-white rounded-2xl font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <LogIn size={18} className="text-amber-400" />
                  دخول الكاشير والمنصة
                </button>
              )}

              <a
                href="https://wa.me/966500000000"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-2xl font-black text-xs border border-emerald-200 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                الدعم الفني عبر الواتساب
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Redesigned Hero Section - Centered Layout with Dashboard Screenshot */}
      <section id="hero" className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white border-b border-indigo-900/50">
        
        {/* Decorative Ambient Background Lights */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Centered Hero Header Content */}
          <div className="max-w-4xl mx-auto text-center space-y-7">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/30 rounded-full text-xs font-black text-amber-300 shadow-sm backdrop-blur-md">
              <Crown size={15} className="text-amber-400" />
              <span>المنصة السحابية المعتمدة لإدارة مغاسل الملابس بالكامل</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.2] tracking-tight">
              منصة إدارة المغاسل
              <span className="block text-transparent bg-clip-text bg-gradient-to-l from-amber-300 via-amber-200 to-amber-400 mt-2">
                الكاشير السريع، الفواتير، والواتساب
              </span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm lg:text-base font-bold leading-relaxed max-w-2xl mx-auto">
              نظام سحابي متطور وسهل الاستخدام يغنيك عن الأجهزة المكلفة. يتيح لك إدارة الفواتير الإلكترونية المعتمدة، طباعة الباركود، إشعارات الواتساب التلقائية للعملاء، وتتبع الأرباح والمخزون بدقة متناهية.
            </p>

            {/* Action CTAs Centered */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={onOpenAuth}
                className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-indigo-950 rounded-2xl font-black text-xs shadow-xl shadow-amber-400/20 active:scale-95 transition-all flex items-center gap-2"
              >
                <LogIn size={18} />
                تجربة نظام الكاشير مجاناً
              </button>

              <a
                href="#screens-showcase"
                className="px-7 py-4 bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-2xl font-black text-xs border border-indigo-400/30 backdrop-blur-md active:scale-95 transition-all flex items-center gap-2"
              >
                <Store size={18} className="text-amber-300" />
                استعراض شاشات الكاشير
              </a>

              <a
                href="#pricing"
                className="px-7 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-black text-xs border border-white/20 backdrop-blur-md active:scale-95 transition-all flex items-center gap-2"
              >
                <Crown size={18} className="text-amber-400" />
                عرض باقة الاشتراك السنوية
              </a>
            </div>

            {/* Key Platform Stats Centered */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-right max-w-3xl mx-auto">
              <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 flex items-center gap-3">
                <div className="w-9 h-9 bg-amber-400/20 text-amber-300 rounded-xl flex items-center justify-center font-black text-xs shrink-0">
                  <Store size={18} />
                </div>
                <div>
                  <span className="block text-xs font-black text-white">+250 مغسلة</span>
                  <span className="text-[10px] text-slate-400 font-bold">تعمل بالنظام</span>
                </div>
              </div>

              <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 flex items-center gap-3">
                <div className="w-9 h-9 bg-indigo-500/20 text-indigo-300 rounded-xl flex items-center justify-center font-black text-xs shrink-0">
                  <Shirt size={18} />
                </div>
                <div>
                  <span className="block text-xs font-black text-white">+1.5M قطعة</span>
                  <span className="text-[10px] text-slate-400 font-bold">فواتير معالجة</span>
                </div>
              </div>

              <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 flex items-center gap-3">
                <div className="w-9 h-9 bg-emerald-500/20 text-emerald-300 rounded-xl flex items-center justify-center font-black text-xs shrink-0">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <span className="block text-xs font-black text-white">واتساب آلي</span>
                  <span className="text-[10px] text-slate-400 font-bold">إشعار الاستلام</span>
                </div>
              </div>

              <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 flex items-center gap-3">
                <div className="w-9 h-9 bg-amber-500/20 text-amber-300 rounded-xl flex items-center justify-center font-black text-xs shrink-0">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <span className="block text-xs font-black text-white">100% معتمد</span>
                  <span className="text-[10px] text-slate-400 font-bold">الفاتورة الإلكترونية</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Platform Value Highlights Section */}
      <section id="why-us" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <span className="px-3.5 py-1.5 bg-amber-100 text-amber-900 text-xs font-black rounded-full inline-flex items-center gap-1.5">
              <Sparkles size={15} className="text-amber-600" />
              منظومة سحابية متكاملة
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-indigo-950">
              لماذا يختار أصحاب المغاسل المنصة السحابية؟
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-bold leading-relaxed">
              صُمم النظام ليوفر وقتك، يقلل أخطاء الكاشير، ويمنحك تحكماً كاملاً بمغسلتك من أي مكان وفي أي وقت
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="p-6 bg-slate-50 hover:bg-indigo-950/5 rounded-3xl border border-slate-200/80 transition-all hover:-translate-y-1 hover:shadow-xl space-y-4">
              <div className="w-12 h-12 bg-amber-400/20 text-amber-700 rounded-2xl flex items-center justify-center font-black text-xl">
                ⚡
              </div>
              <h3 className="text-base font-black text-indigo-950">كاشير أسرع بـ 3 أضعاف</h3>
              <p className="text-xs text-slate-600 font-bold leading-relaxed">
                اختيار سريع لقطع الملابس والخدمات بنقرة واحدة، احتساب الضريبة تلقائياً وإصدار الفاتورة بدون تأخير للعملاء.
              </p>
            </div>

            <div className="p-6 bg-slate-50 hover:bg-indigo-950/5 rounded-3xl border border-slate-200/80 transition-all hover:-translate-y-1 hover:shadow-xl space-y-4">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-700 rounded-2xl flex items-center justify-center font-black text-xl">
                📱
              </div>
              <h3 className="text-base font-black text-indigo-950">إشعارات الواتساب التلقائية</h3>
              <p className="text-xs text-slate-600 font-bold leading-relaxed">
                تنبيه آلي فوري برقم الفاتورة ورابط تفاصيل الطلب، ورسالة آلية أخرى عند جاهزية الملابس للاستلام.
              </p>
            </div>

            <div className="p-6 bg-slate-50 hover:bg-indigo-950/5 rounded-3xl border border-slate-200/80 transition-all hover:-translate-y-1 hover:shadow-xl space-y-4">
              <div className="w-12 h-12 bg-indigo-500/20 text-indigo-700 rounded-2xl flex items-center justify-center font-black text-xl">
                🧾
              </div>
              <h3 className="text-base font-black text-indigo-950">فاتورة إلكترونية معتمدة</h3>
              <p className="text-xs text-slate-600 font-bold leading-relaxed">
                فواتير حرارية متوافقة مع متطلبات هيئة الزكاة والضريبة والجمارك مع طباعة رمز QR الخاص بالفاتورة.
              </p>
            </div>

            <div className="p-6 bg-slate-50 hover:bg-indigo-950/5 rounded-3xl border border-slate-200/80 transition-all hover:-translate-y-1 hover:shadow-xl space-y-4">
              <div className="w-12 h-12 bg-purple-500/20 text-purple-700 rounded-2xl flex items-center justify-center font-black text-xl">
                📊
              </div>
              <h3 className="text-base font-black text-indigo-950">تقارير وأرباح دقيقة</h3>
              <p className="text-xs text-slate-600 font-bold leading-relaxed">
                متابعة يومية وشهرية للمبيعات، النقدية، الشبكة، المبالغ المعلقة ومخزون الصابون والمواد الاستهلاكية.
              </p>
            </div>

          </div>

          <div className="mt-12 bg-gradient-to-r from-indigo-950 to-slate-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-right">
              <h4 className="text-xl font-black text-amber-300">جاهز لتطوير أداء مغسلتك اليوم؟</h4>
              <p className="text-xs font-bold text-slate-300">انضم لأكثر من 250 مغسلة تعمل بكفاءة وسرعة باستخدام منصة إدارة المغاسل</p>
            </div>
            <button
              onClick={onOpenAuth}
              className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-indigo-950 font-black rounded-2xl text-xs transition-all shadow-xl shadow-amber-400/20 shrink-0"
            >
              ابدأ تجربتك المجانية الآن
            </button>
          </div>

        </div>
      </section>

      {/* System Screenshots Showcase Sections */}
      <section id="screens-showcase" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28 relative z-10">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="px-4 py-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black rounded-full inline-flex items-center gap-1.5">
              <Sparkles size={15} />
              استعراض شاشات النظام المباشرة
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              تعرّف على شاشات المنصة وسهولة الاستخدام
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm font-bold leading-relaxed">
              تصميم عربي عصري مبسط ومصمم خصيصاً لتسريع عمل الكاشير وتنظيم طلبات ومخزون المغسلة بدقة متناهية
            </p>
          </div>

          {/* Section 1: Cashier Showcase */}
          <div id="cashier-showcase" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-6 text-right">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-500/20 border border-indigo-400/30 rounded-xl text-xs font-black text-indigo-300">
                <Store size={16} />
                <span>شاشة الكاشير السريع</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                واجهة كاشير جديد — بساطة بلمسات سريعة
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm font-bold leading-relaxed">
                تسجيل الطلبات واختيار الملابس بلمسة واحدة دون معقدات. إدخال اسم العميل ورقم الواتساب، تطبيق الخصومات، واختيار نوع الخدمة فوراً.
              </p>

              <div className="space-y-3 pt-2 text-xs font-bold text-slate-200">
                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                  <div className="w-7 h-7 bg-amber-400/20 text-amber-300 rounded-xl flex items-center justify-center font-black shrink-0">👕</div>
                  <div>
                    <h4 className="font-black text-white text-xs">شبكة اختيار الملابس التفاعلية</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">أيقونات مخصصة للثوب الأبيض، الشماغ، العباءة، البدلة الكاملة والقطع المختلفة مع عرض السعر.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                  <div className="w-7 h-7 bg-emerald-500/20 text-emerald-300 rounded-xl flex items-center justify-center font-black shrink-0">📱</div>
                  <div>
                    <h4 className="font-black text-white text-xs">تفاصيل العميل والواتساب المباشر</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">تسجيل هاتف العميل تلقائياً لإرسال إشعار استلام الفاتورة وجاهزية الطلب.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                  <div className="w-7 h-7 bg-purple-500/20 text-purple-300 rounded-xl flex items-center justify-center font-black shrink-0">⚡</div>
                  <div>
                    <h4 className="font-black text-white text-xs">خيارات الخصم والخدمة المستعجلة والضريبة</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">تحويل الخدمة لمستعجلة، خصم مالي أو نسبة، واحتساب ضريبة القيمة المضافة 15% بضغطة زر.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenAuth}
                  className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-indigo-950 rounded-2xl font-black text-xs transition-all shadow-lg shadow-amber-400/20"
                >
                  تجربة الكاشير السريع مجاناً 🚀
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-[2rem] border border-white/20 bg-slate-950 p-2 shadow-2xl overflow-hidden group">
                <div className="bg-slate-900 px-4 py-2.5 rounded-t-[1.5rem] border-b border-white/10 flex items-center justify-between text-[11px] font-bold text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    شاشة كاشير جديد — مغسلة نظافة وعود
                  </span>
                  <span className="text-amber-300 font-mono">LAUNDRY PRO V5.8</span>
                </div>
                <img
                  src={cashierImg}
                  alt="شاشة كاشير جديد في المنصة"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover rounded-b-[1.5rem] shadow-md transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </div>
            </div>

          </div>

          {/* Section 2: Orders Showcase */}
          <div id="orders-showcase" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="relative rounded-[2rem] border border-white/20 bg-slate-950 p-2 shadow-2xl overflow-hidden group">
                <div className="bg-slate-900 px-4 py-2.5 rounded-t-[1.5rem] border-b border-white/10 flex items-center justify-between text-[11px] font-bold text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-400" />
                    لوحة متابعة وإدارة الطلبات — المغسلة
                  </span>
                  <span className="text-indigo-300 font-mono">قسم الطلبات</span>
                </div>
                <img
                  src={ordersImg}
                  alt="شاشة إدارة الطلبات في المنصة"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover rounded-b-[1.5rem] shadow-md transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6 text-right order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/20 border border-emerald-400/30 rounded-xl text-xs font-black text-emerald-300">
                <FileText size={16} />
                <span>إدارة وحالات الطلبات</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                متابعة الطلبات وتحديث الحالات فورياً
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm font-bold leading-relaxed">
                بطاقات واضحة لكل طلب مع تتبع تفاصيل الملابس وحالة الاستلام، وأزرار سريعة للطباعة، تعديل الفاتورة وإرسال إشعار الجاهزية.
              </p>

              <div className="space-y-3 pt-2 text-xs font-bold text-slate-200">
                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                  <div className="w-7 h-7 bg-indigo-500/20 text-indigo-300 rounded-xl flex items-center justify-center font-black shrink-0">📋</div>
                  <div>
                    <h4 className="font-black text-white text-xs">بطاقات الطلبات المفصلة</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">عرض اسم العميل، الهاتف، القطع والمبالغ الشاملة بدقة متناهية.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                  <div className="w-7 h-7 bg-emerald-500/20 text-emerald-300 rounded-xl flex items-center justify-center font-black shrink-0">🖨️</div>
                  <div>
                    <h4 className="font-black text-white text-xs">طباعة وإرسال الواتساب الفوري</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">زر مخصص لطباعة الباركود والفاتورة الحرارية وزر مباشر لإرسال إشعار الواتساب.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Section 3: Inventory Showcase */}
          <div id="inventory-showcase" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-6 text-right">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/20 border border-blue-400/30 rounded-xl text-xs font-black text-blue-300">
                <Layers size={16} />
                <span>إدارة المخزون الذكي</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                المواد الاستهلاكية وتنبيهات المخزون
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm font-bold leading-relaxed">
                متابعة دقيقة لكميات صابون فيري، صابون تايد بودرة، المعطرات، النيلة، والعلاقات مع تنبيهات ملونة فورية عند انخفاض المخزون.
              </p>

              <div className="space-y-3 pt-2 text-xs font-bold text-slate-200">
                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                  <div className="w-7 h-7 bg-rose-500/20 text-rose-300 rounded-xl flex items-center justify-center font-black shrink-0">⚠️</div>
                  <div>
                    <h4 className="font-black text-white text-xs">تنبيه المخزون المنخفض</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">إشارات تحذيرية فورية عند وصول أي مادة استهلاكية للحد الأدنى لتفادي انقطاع العمل.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                  <div className="w-7 h-7 bg-blue-500/20 text-blue-300 rounded-xl flex items-center justify-center font-black shrink-0">➕</div>
                  <div>
                    <h4 className="font-black text-white text-xs">تعديل وتحديث الكميات بنقرة</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">إمكانية إضافة وزيادة أو إنقاص المخزون وربط المادة بالأصناف المغسولة.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-[2rem] border border-white/20 bg-slate-950 p-2 shadow-2xl overflow-hidden group">
                <div className="bg-slate-900 px-4 py-2.5 rounded-t-[1.5rem] border-b border-white/10 flex items-center justify-between text-[11px] font-bold text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    شاشة المخزون والمواد الاستهلاكية
                  </span>
                  <span className="text-blue-300 font-mono">قسم المخزون</span>
                </div>
                <img
                  src={inventoryImg}
                  alt="شاشة المخزون والمواد الاستهلاكية في المنصة"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover rounded-b-[1.5rem] shadow-md transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </div>
            </div>

          </div>

          {/* Section 4: Accounts Showcase */}
          <div id="accounts-showcase" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="relative rounded-[2rem] border border-white/20 bg-slate-950 p-2 shadow-2xl overflow-hidden group">
                <div className="bg-slate-900 px-4 py-2.5 rounded-t-[1.5rem] border-b border-white/10 flex items-center justify-between text-[11px] font-bold text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                    تصفية الحسابات وإحصائيات مبيعات العملاء
                  </span>
                  <span className="text-purple-300 font-mono">قسم الحسابات</span>
                </div>
                <img
                  src={accountsImg}
                  alt="شاشة الحسابات والتقارير المالية في المنصة"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover rounded-b-[1.5rem] shadow-md transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6 text-right order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-purple-500/20 border border-purple-400/30 rounded-xl text-xs font-black text-purple-300">
                <BarChart3 size={16} />
                <span>التقارير المالية والحسابات</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                تصفية الحسابات وإحصائيات المبيعات
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm font-bold leading-relaxed">
                تقارير شاملة لإجمالي مبيعات المغسلة، المبالغ المعلقة، تفصيل طرق الدفع (نقدي، شبكة/مدى، تحويل بنكي) وحساب ضريبة القيمة المضافة 15%.
              </p>

              <div className="space-y-3 pt-2 text-xs font-bold text-slate-200">
                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                  <div className="w-7 h-7 bg-emerald-500/20 text-emerald-300 rounded-xl flex items-center justify-center font-black shrink-0">💰</div>
                  <div>
                    <h4 className="font-black text-white text-xs">خلاصة المبيعات والطلبات</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">تتبع المبيعات المحصلة، عدد الطلبات المدفوعة، والطلبات المعلقة لفترة محددة.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                  <div className="w-7 h-7 bg-amber-500/20 text-amber-300 rounded-xl flex items-center justify-center font-black shrink-0">💳</div>
                  <div>
                    <h4 className="font-black text-white text-xs">تفاصيل طرق الدفع الضريبية</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">توضيح الدفع عبر شبكة ومدى والنقد والتحويل البنكي لتسهيل الإقرارات الضريبية.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Main Platform Features Section */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-3">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-black rounded-full">
              مميزات منصة إدارة المغاسل
            </span>
            <h2 className="text-3xl font-black text-indigo-950">
              كل ما تحتاجه لإدارة وتنمية عملك في مكان واحد
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm font-bold max-w-xl mx-auto">
              أدوات سحابية حديثة مصممة خصيصاً لتلبية احتياجات المغاسل مع تسهيل تجربة العميل
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-right">
            
            <div className="bg-white border border-slate-200/80 p-8 rounded-[2rem] hover:shadow-xl hover:border-indigo-300 transition-all space-y-4">
              <div className="w-14 h-14 bg-indigo-100 text-indigo-700 rounded-2xl flex items-center justify-center font-black text-2xl">
                <Printer size={28} />
              </div>
              <h3 className="text-lg font-black text-indigo-950">طباعة الباركود والفواتير الحرارية</h3>
              <p className="text-slate-500 text-xs font-bold leading-relaxed">
                طباعة ملصقات الباركود الآمنة لتعليقها على الأقمشة لمنع ضياع الملابس، مع إصدار فواتير حرارية متوافقة مع هيئة الزكاة.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 p-8 rounded-[2rem] hover:shadow-xl hover:border-indigo-300 transition-all space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center font-black text-2xl">
                <MessageCircle size={28} />
              </div>
              <h3 className="text-lg font-black text-indigo-950">إشعارات الواتساب التلقائية</h3>
              <p className="text-slate-500 text-xs font-bold leading-relaxed">
                إرسال رسائل آلية فورية للعملاء تحتوي رابط الفاتورة وإشعاراً بجهوزية ثيابهم للاستلام دون الحاجة للاتصال اليدوي.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 p-8 rounded-[2rem] hover:shadow-xl hover:border-indigo-300 transition-all space-y-4">
              <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center font-black text-2xl">
                <Store size={28} />
              </div>
              <h3 className="text-lg font-black text-indigo-950">كاشير سحابي سريع</h3>
              <p className="text-slate-500 text-xs font-bold leading-relaxed">
                واجهة كاشير بلمسات سريعة تسجل الطلب في ثوانٍ معدودة على الأيباد أو الكمبيوتر دون أي تعقيد.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 p-8 rounded-[2rem] hover:shadow-xl hover:border-indigo-300 transition-all space-y-4">
              <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center font-black text-2xl">
                <Layers size={28} />
              </div>
              <h3 className="text-lg font-black text-indigo-950">تتبع استهلاك المخزون</h3>
              <p className="text-slate-500 text-xs font-bold leading-relaxed">
                خصم آلي للصابون، المنظفات، المعطرات، والعلاقات مع كل عملية غسيل مع تنبيهات عند اقتراب نفاد المخزون.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 p-8 rounded-[2rem] hover:shadow-xl hover:border-indigo-300 transition-all space-y-4">
              <div className="w-14 h-14 bg-purple-100 text-purple-700 rounded-2xl flex items-center justify-center font-black text-2xl">
                <Crown size={28} />
              </div>
              <h3 className="text-lg font-black text-indigo-950">باقات اشتراك العملاء الشهرية</h3>
              <p className="text-slate-500 text-xs font-bold leading-relaxed">
                إنشاء وإدارة باقات اشتراكات القطع الشهرية للعملاء ودعم الدفع المسبق لزيادة ولاء العملاء وتدفق الكاش.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 p-8 rounded-[2rem] hover:shadow-xl hover:border-indigo-300 transition-all space-y-4">
              <div className="w-14 h-14 bg-rose-100 text-rose-700 rounded-2xl flex items-center justify-center font-black text-2xl">
                <BarChart3 size={28} />
              </div>
              <h3 className="text-lg font-black text-indigo-950">التقارير المالية والضريبية</h3>
              <p className="text-slate-500 text-xs font-bold leading-relaxed">
                تقارير الأرباح والمبيعات اليومية، طرق الدفع (كاش، شبكة، مدى، أونلاين)، وإقرارات ضريبة القيمة المضافة 15%.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Redesigned Single-Plan Subscription Section with Yearly Paid Discount */}
      <section id="pricing" className="py-20 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
        
        {/* Background Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center space-y-4 mb-12">
            <span className="px-4 py-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black rounded-full inline-flex items-center gap-1.5">
              <Crown size={15} />
              باقة اشتراك منصة غسيل كلاود
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              اشتراك واحد شامـل لكافة المميزات
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-bold max-w-lg mx-auto">
              احصل على النظام السحابي الشامل للكاشير، الفواتير الإلكترونية، والواتساب مع توفير خاص عند الاشتراك السنوي
            </p>

            {/* Monthly / Yearly Toggle Selector */}
            <div className="flex items-center justify-center gap-3 pt-4">
              <div className="bg-slate-800/90 p-1.5 rounded-2xl border border-slate-700 inline-flex items-center gap-1 shadow-inner">
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-5 py-2.5 rounded-xl font-black text-xs transition-all ${billingCycle === 'monthly' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                >
                  اشتراك شهري
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-5 py-2.5 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 ${billingCycle === 'yearly' ? 'bg-amber-400 text-indigo-950 shadow-md font-black' : 'text-slate-400 hover:text-white'}`}
                >
                  <span>اشتراك سنوي</span>
                  <span className="bg-indigo-950 text-amber-300 text-[10px] px-2 py-0.5 rounded-full border border-amber-400/40">توفير 20% 🔥</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Single Subscription Pricing Card */}
          <div className="bg-gradient-to-b from-slate-800/90 via-indigo-950/90 to-slate-900/95 border-2 border-amber-400/60 rounded-[3rem] p-8 sm:p-12 shadow-2xl backdrop-blur-xl relative space-y-8">
            
            {/* Top Ribbon */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="bg-amber-400 text-indigo-950 font-black text-xs px-3.5 py-1 rounded-full shadow-sm inline-block mb-2">
                  {billingCycle === 'yearly' ? '⭐ الباقة السنوية الأوفر (دفع سنوي)' : 'باقة الدفع الشهري'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">باقة المنصة الشاملة للمغاسل</h3>
                <p className="text-xs text-slate-300 font-bold mt-1">تغطي كافة متطلبات المغسلة بدون أي تكاليف إضافية</p>
              </div>

              {/* Price Display */}
              <div className="text-left sm:text-right">
                {billingCycle === 'yearly' ? (
                  <div>
                    <div className="flex items-baseline gap-2 justify-end">
                      <span className="text-4xl sm:text-5xl font-black text-amber-300">159</span>
                      <span className="text-xs font-bold text-slate-300">ريال / شهرياً</span>
                    </div>
                    <p className="text-[11px] font-black text-emerald-400 mt-1">
                      تُدفع سنوياً بـ 1,890 ر.س (بدلاً من 2,388 ر.س)
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-baseline gap-2 justify-end">
                      <span className="text-4xl sm:text-5xl font-black text-white">199</span>
                      <span className="text-xs font-bold text-slate-300">ريال / شهرياً</span>
                    </div>
                    <p className="text-[11px] font-bold text-slate-400 mt-1">تجدد شهرياً تلقائياً</p>
                  </div>
                )}
              </div>
            </div>

            {/* Included Features Grid */}
            <div>
              <h4 className="text-sm font-black text-amber-300 mb-4 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-amber-400" />
                المميزات والخدمات المضمنة في الباقة:
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-200">
                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/5">
                  <div className="p-1 bg-emerald-500/20 text-emerald-400 rounded-lg shrink-0 mt-0.5">
                    <Check size={14} />
                  </div>
                  <span>نظام كاشير سحابي سريع وغير محدود اللمسات على جميع الأجهزة.</span>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/5">
                  <div className="p-1 bg-emerald-500/20 text-emerald-400 rounded-lg shrink-0 mt-0.5">
                    <Check size={14} />
                  </div>
                  <span>طباعة ملصقات الباركود الآمنة للأقمشة لمنع اختلاط الملابس.</span>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/5">
                  <div className="p-1 bg-emerald-500/20 text-emerald-400 rounded-lg shrink-0 mt-0.5">
                    <Check size={14} />
                  </div>
                  <span>إصدار فواتير حرارية وإلكترونية معتمدة بموجب هيئة الزكاة (QR).</span>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/5">
                  <div className="p-1 bg-emerald-500/20 text-emerald-400 rounded-lg shrink-0 mt-0.5">
                    <Check size={14} />
                  </div>
                  <span>إشعارات واتساب تلقائية فورية للعملاء عند تجهيز الفاتورة والجاهزية.</span>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/5">
                  <div className="p-1 bg-emerald-500/20 text-emerald-400 rounded-lg shrink-0 mt-0.5">
                    <Check size={14} />
                  </div>
                  <span>إدارة خصم مخزون المنظفات والمعطرات والعلاقات تلقائياً.</span>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/5">
                  <div className="p-1 bg-emerald-500/20 text-emerald-400 rounded-lg shrink-0 mt-0.5">
                    <Check size={14} />
                  </div>
                  <span>إدارة باقات واشتراكات العملاء الشهرية والقطع مسبقة الدفع.</span>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/5">
                  <div className="p-1 bg-emerald-500/20 text-emerald-400 rounded-lg shrink-0 mt-0.5">
                    <Check size={14} />
                  </div>
                  <span>تقارير الأرباح والمبيعات والضريبة 15% وطرق الدفع المتعددة.</span>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/5">
                  <div className="p-1 bg-emerald-500/20 text-emerald-400 rounded-lg shrink-0 mt-0.5">
                    <Check size={14} />
                  </div>
                  <span>دعم فني مباشر وتدريب الكادر على النظام مجاناً 24/7.</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4 text-center">
              <button
                type="button"
                onClick={onOpenAuth}
                className="w-full sm:w-auto px-12 py-5 bg-amber-400 hover:bg-amber-300 text-indigo-950 font-black text-sm rounded-2xl shadow-xl shadow-amber-400/20 active:scale-95 transition-all inline-flex items-center justify-center gap-2"
              >
                <span>الاشتراك وتفعيل المنصة فوراً 🚀</span>
              </button>
              <p className="text-[11px] text-slate-400 font-bold mt-3">
                تجربة مجانية لمدة 7 أيام • لا يتطلب بطاقة ائتمانية للتسجيل
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-12">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-black rounded-full">
              الأسئلة الشائعة
            </span>
            <h2 className="text-3xl font-black text-indigo-950">
              استفسارات أصحاب المغاسل عن المنصة
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-right font-black text-xs sm:text-sm text-indigo-950 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.question}</span>
                  {openFaq === idx ? <ChevronUp size={18} className="text-indigo-600" /> : <ChevronDown size={18} className="text-slate-400" />}
                </button>

                {openFaq === idx && (
                  <div className="p-5 pt-0 text-xs font-bold text-slate-500 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-950 text-slate-400 py-12 border-t border-indigo-900 text-xs font-bold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-400 text-indigo-950 rounded-xl flex items-center justify-center font-black">
                <Building2 size={20} />
              </div>
              <div>
                <h3 className="font-black text-white text-base">منصة إدارة المغاسل</h3>
                <p className="text-[11px] text-slate-400">النظام السحابي الأحدث لمغاسل الملابس والخدمات المتكاملة</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-slate-300 font-bold">
              <a href="#hero" className="hover:text-amber-400 transition-colors">الرئيسية</a>
              <a href="#features" className="hover:text-amber-400 transition-colors">المميزات</a>
              <a href="#calculator" className="hover:text-amber-400 transition-colors">كاشير الأسعار</a>
              <a href="#pricing" className="hover:text-amber-400 transition-colors">باقة الاشتراك</a>
              <a href="#faq" className="hover:text-amber-400 transition-colors">الأسئلة الشائعة</a>
            </div>

          </div>

          <div className="border-t border-indigo-900/80 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
            <p>© {new Date().getFullYear()} منصة إدارة المغاسل. جميع الحقوق محفوظة.</p>
            <p className="flex items-center gap-2">
              <span>متوافق مع الفاتورة الإلكترونية هيئة الزكاة والضريبة 🇸🇦</span>
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};
