"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/component/ui/button";
import { Card } from "@/component/ui/card";
import { Input } from "@/component/ui/input";
import { Textarea } from "@/component/ui/textarea";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { toast } from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/component/ui/dialog";
import {
  Zap,
  Palette,
  DollarSign,
  HeadphonesIcon,
  Check,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  Sparkles,
  Code,
  Rocket,
  Paintbrush,
  RefreshCw,
  Settings,
  X,
  Menu,
  Moon,
  Sun,
  ChevronDown,
} from "lucide-react";

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const honeyPot = (document.getElementById("website") as HTMLInputElement)
      ?.value;

    if (honeyPot) {
      toast.error("Spam detected. Submission blocked.");
      setLoading(false);
      return;
    }

    // Validate form
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.message.trim()
    ) {
      toast.error("❌ Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      // ✅ Parse and validate phone number
      const parsedPhone = parsePhoneNumberFromString(formData.phone);

      if (!parsedPhone || !parsedPhone.isValid()) {
        toast.error(
          "❌ Please enter a valid phone number (include country code, e.g., +234...)"
        );
        setLoading(false);
        return;
      }

      // ✅ Format number into E.164 (e.g. +2348069220707)
      const formattedPhone = parsedPhone.number;

      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          phone: formattedPhone, // replace original phone with formatted version
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("✅ Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error(`❌ ${data.error || "Something went wrong. Try again."}`);
      }
    } catch (error) {
      toast.error("⚠️ Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const services = [
    {
      icon: Paintbrush,
      title: "Custom Website Design",
      description:
        "Get a website as unique as your brand.Tailored layouts, modern aesthetics, and conversion-focused design built just for your business.",
      features: [
        "Unique design",
        "Brand integration",
        "User research",
        "Wireframing & prototyping",
      ],
      color: "#F0C93D",
      fullDescription:
        "Your Brand. Your Vision. Our Expertise.At Zenova, we craft tailor-made websites that capture your story and connect with your audience. Whether you run a local café, salon, or agency, we’ll build a design that’s visually stunning, mobile-optimized, and ready to grow with your business.",
      detailedFeatures: [
        "100% Custom Design",
        "Built with modern React frameworks",
        "Unique visual design aligned with your brand",
        "User experience (UX) research and testing",
        "Responsive design for all devices",
        "Accessibility compliance (WCAG)",
        "Modern animations and interactions",
        "3 rounds of revisions included",
      ],
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    },
    {
      icon: RefreshCw,
      title: "Website Redesign",
      description:
        "Transform your outdated site into a powerhouse.We’ll rebuild your online presence with speed, strategy, and a fresh modern look that turns visitors into customers.",
      features: [
        "Modern refresh",
        "UX improvements",
        "Mobile optimization",
        "Performance boost",
      ],
      color: "#F0C93D",
      fullDescription:
        "Outdated Website? Let’s Fix That.Your website is often your first impression — and at Lunvia, we make sure it’s unforgettable. We’ll take your existing site and rebuild it with better design, better performance, and better conversion flow.",
      detailedFeatures: [
        "Modern UI/UX that fits your brand",
        "Improved page speed and responsiveness",
        "Strategic content layout for better sales",
        "Mobile-first responsive redesign",
        "Revamped visuals, animations & interactions",
        "SEO preservation and enhancement",
        "Content migration and restructuring",
        "Analytics setup and goal tracking",
      ],
      image:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
    },
    {
      icon: Settings,
      title: "Website Optimization",
      description:
        "Make your site faster, smarter, and more visible.From SEO tweaks to performance boosts — we optimize for both humans and Google.",
      features: [
        "Speed optimization",
        "SEO improvements",
        "Analytics setup",
        "Conversion optimization",
      ],
      color: "#F0C93D",
      fullDescription:
        "Speed Up. Rank Higher. Convert More.A slow or poorly optimized site can cost you leads and credibility. We fine-tune your website from the inside out — boosting speed, SEO, and usability.",
      detailedFeatures: [
        "Page speed optimization (Core Web Vitals)",
        "Technical SEO audit and implementation",
        "Image optimization and lazy loading",
        "Code minification and compression",
        "Conversion rate optimization (CRO)",
        "Analytics and heatmap setup",
        "A/B testing implementation",
        "Monthly performance reports",
      ],
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    },
  ];

  const templates = [
    {
      name: "Restaurant & Cafe",
      category: "Food & Beverage",
      price: "$299",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
      description:
        "Feed More Than Appetites.> A sleek design built for restaurants that want to look as good online as their food tastes — with menus, bookings, and reviews built-in.",
    },
    {
      name: "Professional Services",
      category: "Business",
      price: "$349",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      description:
        "Ideal for consultants, agencies, and service providers. Features portfolio, testimonials, and contact forms.",
    },
    {
      name: "Beauty & Wellness",
      category: "Health & Beauty",
      price: "$299",
      image:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop",
      description:
        "Style That Sells Itself, Elegant layouts and smooth animations that make your brand shine. Perfect for salons, spas, and studios ready to stand out.",
    },
    {
      name: "Retail & E-commerce",
      category: "Online Store",
      price: "$449",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      description:
        "Full e-commerce solution with product catalog, shopping cart, and payment integration.",
    },
    {
      name: "Real Estate",
      category: "Property",
      price: "$399",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
      description:
        "Showcase Homes in Their Best Light.Crisp visuals and intuitive navigation that turn browsers into buyers. Designed to handle listings beautifully.",
    },
    {
      name: "Fitness & Gym",
      category: "Health & Fitness",
      price: "$349",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
      description:
        "> **Built to Motivate.A high-energy design that drives memberships, bookings, and client trust — optimized for both speed and style.",
    },
  ];

  const pricingPlans = [
    {
      name: "Template",
      price: "$79", // Raised slightly to reflect good quality React template, demos, support etc.
      description:
        "Perfect for solo brands & small businesses – a ready-to-launch website template designed for your niche, fully responsive, React-based.",
      features: [
        "Choose from 50+ premium templates",
        "Fully responsive, React-based design with easy customization",
        "Mobile and desktop optimized",
        "SEO-friendly structure & performance basics",
        "Live demo + preview screenshots",
        "Free setup guide & 14-day email support",
        "One-time payment — lifetime ownership",
      ],
      popular: false,
    },
    {
      name: "Template + Setup",
      price: "$229", // mid level: template + some service
      description:
        "Template plus custom setup – we will install, brand, and personalize for your business.",
      features: [
        "Everything in Template plan",
        "Domain / hosting guide or assistance",
        "Brand colors, logos, images replaced",
        "One round of content replacement (text/images)",
        "Basic SEO adjustments",
        "30-day support & bug fixes",
      ],
      popular: true,
    },
    {
      name: "Custom Website",
      price: "$999", // similar to Webexis, gives you room to provide value
      description:
        "Tailored website design & development to match your brand—built from scratch with custom layout and features.",
      features: [
        "Unique custom design from wireframe",
        "Unlimited revisions (within defined scope)",
        "Responsive, high performance, fast loading",
        "Advanced SEO optimization",
        "Content integration & forms",
        "Analytics / maps / integrations as needed",
        "Training / handover + 60 days support",
      ],
      popular: false,
    },
    {
      name: "Enterprise / Agency",
      price: "Custom",
      description:
        "For complex requirements - large sites, integrations, or multi-site clients. Contact for quote.",
      features: [
        "Everything in Custom Website plan",
        "E-commerce / API integrations / plugin & module development",
        "Dedicated account manager",
        "Custom optimization, scaling & maintenance",
        "Priority 24/7 support",
        "White-label handover and full documentation",
      ],
      popular: false,
    },
  ];

  const faqItems = [
    {
      question: "Are Zenova website built with AI?",
      answer:
        "We use AI-powered tools to speed up the design process — but every Lunvia website is personally reviewed, customized, and fine-tuned by a real designer before delivery. The result? Speed of AI, quality of human craftsmanship.",
    },
    {
      question: "Can I customize my website after purchase?",
      answer:
        " Absolutely.All Zenova templates and custom builds are editable, you can update text, colors, and images anytime.For deeper edits, you can request professional customization from our team",
    },
    {
      question: " How long does it take to get my website live?",
      answer:
        "Templates: usually ready within 24–48 hours after purchase. Custom designs: typically delivered within 5–10 business days, depending on project size. We’ll give you a clear timeline before we start — no surprises.",
    },
    {
      question: "How do payments work?",
      answer:
        "We offer secure online payment options (PayPal, Stripe, or card) for both template and custom service purchases.Every transaction is encrypted and protected — so your payment is always safe.",
    },
    {
      question: " Do you work with international clients?",
      answer:
        "Yes — Zenova works with clients from all over the world 🌍.We communicate through email or chat and adjust to your time zone to make things smooth and easy.",
    },
    {
      question: "Do you offer SEO services?",
      answer:
        "Yes! All our websites are built with SEO best practices. This includes optimized code, fast loading times, proper meta tags, and mobile optimization. We also offer advanced SEO services as an add-on for deeper optimization.",
    },
    {
      question: "What if I don’t like my first design?",
      answer:
        "No problem. You’ll receive a preview for review and feedback before final delivery.We offer one free revision round on every project to ensure you’re 100% satisfied.",
    },
    {
      question: "What happens after my website is delivered?",
      answer:
        "You’ll receive full access, a setup guide, and optional ongoing support.Our team is always available if you need updates, maintenance, or SEO improvements later on.",
    },
    {
      question:
        " Why should I choose Lunvia instead of Fiverr or big agencies?",
      answer:
        "With Zenova, you get the best of both worlds — the personal care of a small studio and the quality of a professional agency.",
    },
    {
      question:
        "Can I request a completely custom project (outside the templates)?",
      answer:
        "Definitely. Just send us a message or book a free consultation.We’ll discuss your goals, brand, and timeline, then create a unique plan tailored to your business.",
    },
  ];

  const handlePlanClick = (plan: any) => {
    // Only Template plan opens the modal, Custom and Enterprise redirect to payment links
    if (plan.name === "Template") {
      setSelectedPlan(plan);
    } else if (plan.name === "Custom") {
      // Redirect to custom plan payment link
      window.open("YOUR_CUSTOM_PLAN_LINK_HERE", "_blank");
    } else if (plan.name === "Enterprise") {
      // Redirect to enterprise plan payment link
      window.open("YOUR_ENTERPRISE_PLAN_LINK_HERE", "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B132B]">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0B132B]/80 backdrop-blur-lg border-b border-gray-200 dark:border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="text-lg sm:text-xl md:text-2xl font-bold flex-shrink-0"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-[#0B132B] dark:text-white">ZENOVA</span>
              <span className="text-white dark:text-[#F0C93D]">STUDIO</span>
            </motion.div>

            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <a
                href="#"
                className="text-sm font-medium text-[#0B132B] dark:text-white/90 hover:text-[#F0C93D] dark:hover:text-[#F0C93D] transition-colors"
              >
                Home
              </a>

              <a
                href="#services"
                className="text-sm font-medium text-[#0B132B] dark:text-white/90 hover:text-[#F0C93D] dark:hover:text-[#F0C93D] transition-colors"
              >
                Services
              </a>

              <a
                href="#templates"
                className="text-sm font-medium text-[#0B132B] dark:text-white/90 hover:text-[#F0C93D] dark:hover:text-[#F0C93D] transition-colors"
              >
                Templates
              </a>

              <a
                href="#about"
                className="text-sm font-medium text-[#0B132B] dark:text-white/90 hover:text-[#F0C93D] dark:hover:text-[#F0C93D] transition-colors"
              >
                About Us
              </a>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                onClick={toggleTheme}
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-[#F0C93D]" />
                ) : (
                  <Moon className="h-5 w-5 text-[#0B132B]" />
                )}
              </Button>
              <Button
                className="hidden md:block bg-[#0B132B] hover:bg-[#0B132B]/90 dark:bg-[#F0C93D] dark:hover:bg-[#F0C93D]/90 text-white dark:text-[#0B132B] text-xs sm:text-sm px-3 sm:px-4 md:px-6 h-9 sm:h-10"
                onClick={() => (window.location.href = "#contact")}
              >
                Get Started
              </Button>
              <Button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                variant="ghost"
                size="icon"
                className="md:hidden h-9 w-9 rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 text-[#0B132B] dark:text-white" />
                ) : (
                  <Menu className="h-5 w-5 text-[#0B132B] dark:text-white" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden mt-4 pb-4 border-t border-gray-100 dark:border-white/10 pt-4"
            >
              <div className="flex flex-col gap-4">
                <a
                  href="#"
                  className="text-sm font-medium text-[#0B132B] dark:text-white/90 hover:text-white dark:hover:text-[#F0C93D] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </a>
                <a
                  href="#services"
                  className="text-sm font-medium text-[#0B132B] dark:text-white/90 hover:text-white dark:hover:text-[#F0C93D] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Services
                </a>
                <a
                  href="#templates"
                  className="text-sm font-medium text-[#0B132B] dark:text-white/90 hover:text-white dark:hover:text-[#F0C93D] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Templates
                </a>
                <a
                  href="#about"
                  className="text-sm font-medium text-[#0B132B] dark:text-white/90 hover:text-white dark:hover:text-[#F0C93D] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </a>
                <a
                  href="#contact"
                  className="text-sm font-medium text-[#0B132B] dark:text-white/90 hover:text-white dark:hover:text-[#F0C93D] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section
        className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0B132B 0%, #1a2544 50%, #0B132B 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#F0C93D] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#F0C93D] rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-[#F0C93D]" />
              <span className="text-xs sm:text-sm text-white/90">
                Trusted by 50+ Businesses
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Where Small Businesses
              <br />
              <span style={{ color: "#F0C93D" }}> Look Big Online..</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto"
            >
              At Zenova, we craft premium websites — powered by modern tech and
              customized for your brand — giving local businesses a global look
              that’s fast, beautiful, and built to convert.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#F0C93D] hover:bg-[#F0C93D]/90 text-[#0B132B] font-semibold px-8 group"
              >
                Browse Templates
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white text-[#0B132B] hover:bg-white hover:text-[#0B132B] transition-all font-semibold"
              >
                Hire Us
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#F0C93D] mb-1">
                  24h
                </div>
                <div className="text-xs sm:text-sm text-white/70">
                  Fast Delivery
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#F0C93D] mb-1">
                  50+
                </div>
                <div className="text-xs sm:text-sm text-white/70">
                  Happy Clients
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#F0C93D] mb-1">
                  99%
                </div>
                <div className="text-xs sm:text-sm text-white/70">
                  Satisfaction
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose zenova */}
      <section className="py-20 px-4 sm:px-6 bg-gray-50 dark:bg-[#0B132B]/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#0B132B] dark:text-white">
              Why Choose <span style={{ color: "#F0C93D" }}>Zenova</span>?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-white/70 max-w-2xl mx-auto">
              We combine speed, modern design, and affordability to deliver
              exceptional websites that drive results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Zap,
                title: "Speed",
                description:
                  "Launch Fast — Stay Ahead,Every Zenova site is built to go live in days, not months. You get results faster, so your business can grow sooner.",
                color: "#F0C93D",
                delay: 0.1,
              },
              {
                icon: Palette,
                title: "Modern Design",
                description:
                  "Look Premium. Feel Professional,Our designs blend clean layouts, bold typography, and smooth motion to make your business look world-class from day one.",
                color: "#F0C93D",
                delay: 0.2,
              },
              {
                icon: DollarSign,
                title: "Premium Quality. Honest Pricing",
                description:
                  "We believe great design shouldn’t cost a fortune. Choose a template or a custom package that fits your budget — without compromise.",
                color: "#F0C93D",
                delay: 0.3,
              },
              {
                icon: HeadphonesIcon,
                title: "Personal Suppor",
                description:
                  "Real People. Real Help,From your first inquiry to final launch, you’ll work directly with a dedicated designer who actually listens and delivers.",
                color: "#F0C93D",
                delay: 0.3,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: feature.delay }}
                whileHover={{ y: -10 }}
              >
                <Card className="p-6 sm:p-8 h-full border shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-[#0B132B]/80 dark:border-white/20 dark:shadow-lg dark:shadow-[#F0C93D]/5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    <feature.icon
                      className="w-7 h-7"
                      style={{ color: feature.color }}
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 text-[#0B132B] dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-white/70 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-20 px-4 sm:px-6 bg-white dark:bg-[#0B132B]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#0B132B] dark:text-white">
              Our <span style={{ color: "#F0C93D" }}>Services</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-white/70 max-w-2xl mx-auto">
              Beautiful websites. Real results. From fresh designs to full
              revamps — Zenova helps your brand look professional, load faster,
              and convert better.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="p-6 sm:p-8 h-full border-2 border-transparent hover:border-[#F0C93D] shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-[#0B132B]/80 dark:border-white/20 dark:shadow-lg dark:shadow-[#F0C93D]/5 dark:hover:border-[#F0C93D]">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${service.color}20` }}
                  >
                    <service.icon
                      className="w-8 h-8"
                      style={{ color: service.color }}
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 text-[#0B132B] dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-white/70 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/70"
                      >
                        <Check className="w-4 h-4 text-[#F0C93D] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => setSelectedService(service)}
                    className="w-full bg-[#0B132B] hover:bg-[#0B132B]/90 dark:bg-[#F0C93D] dark:hover:bg-[#F0C93D]/90 text-white dark:text-[#0B132B] font-semibold"
                  >
                    Learn More
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details Dialog */}
      <Dialog
        open={!!selectedService}
        onOpenChange={() => setSelectedService(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedService && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl sm:text-3xl font-bold text-[#0B132B] dark:text-white">
                  {selectedService.title}
                </DialogTitle>
                <DialogDescription className="text-base sm:text-lg text-gray-600 dark:text-white/70 mt-2">
                  {selectedService.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 text-[#0B132B] dark:text-white">
                    Overview
                  </h3>
                  <p className="text-xl font-bold mb-4 text-[#0B132B] dark:text-white">
                    {selectedService.fullDescription}
                  </p>

                  <h3 className="text-xl font-bold mb-4 text-[#0B132B] dark:text-white">
                    What's Included
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {selectedService.detailedFeatures.map(
                      (feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-[#F0C93D] flex-shrink-0 mt-0.5" />
                          <span className="text-sm sm:text-base text-gray-600 dark:text-white/70">
                            {feature}
                          </span>
                        </li>
                      )
                    )}
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-4 p-6 bg-gray-50 dark:bg-[#1C2541] rounded-lg">
                    <Button
                      className="lex-1 bg-[#0B132B] hover:bg-[#0B132B]/90 text-white font-semibold dark:bg-[#F0C93D] dark:hover:bg-[#F0C93D]/90 dark:text-[#0B132B]"
                      onClick={() => {
                        setSelectedService(null);
                        document
                          .getElementById("contact")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Request a Quote
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-[#0B132B] text-[#0B132B] hover:bg-[#0B132B]/10 dark:border-[#F0C93D] dark:text-[#F0C93D] dark:hover:bg-[#F0C93D]/10"
                      onClick={() => setSelectedService(null)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Templates Showcase */}
      <section
        id="templates"
        className="py-20 px-4 sm:px-6 bg-gray-50 dark:bg-[#0B132B]/50"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#0B132B] dark:text-white">
              Featured <span style={{ color: "#F0C93D" }}>Templates</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-white/70 max-w-2xl mx-auto">
              Choose from our collection of professionally designed templates,
              ready to customize for your business.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {templates.map((template, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => setSelectedTemplate(template)}
              >
                <Card className="overflow-hidden border shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-[#0B132B]/80 dark:border-white/20 dark:shadow-lg dark:shadow-[#F0C93D]/5">
                  <div className="relative overflow-hidden">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-48 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6">
                      <Button className="bg-[#F0C93D] hover:bg-[#F0C93D]/90 text-[#0B132B] font-semibold w-full sm:w-auto">
                        View Template
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="text-xs sm:text-sm text-[#F0C93D] font-medium mb-2">
                      {template.category}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0B132B] dark:text-white">
                      {template.name}
                    </h3>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Preview Dialog */}
      <Dialog
        open={!!selectedTemplate}
        onOpenChange={() => setSelectedTemplate(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0B132B] text-[#0B132B] dark:text-white">
          {selectedTemplate && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-[#0B132B] dark:text-white">
                  {selectedTemplate.name}
                </DialogTitle>
                <DialogDescription className="text-[#F0C93D] font-medium">
                  {selectedTemplate.category}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={selectedTemplate.image}
                    alt={selectedTemplate.name}
                    className="w-full h-64 sm:h-96 object-cover"
                  />
                </div>

                <div>
                  <p className="text-gray-600 dark:text-white/70 text-sm sm:text-base leading-relaxed mb-6">
                    {selectedTemplate.description}
                  </p>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6 bg-gray-50 dark:bg-[#1C2541] rounded-lg">
                    <div>
                      <div className="text-sm text-gray-600 dark:text-white/70 mb-1">
                        Starting at
                      </div>
                      <div
                        className="text-3xl sm:text-4xl font-bold"
                        style={{ color: "#F0C93D" }}
                      >
                        {selectedTemplate.price}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto border-[#0B132B] text-[#0B132B] hover:bg-[#0B132B]/10 dark:border-[#F0C93D] dark:text-[#F0C93D] dark:hover:bg-[#F0C93D]/10"
                        onClick={() => {
    // Added: Redirect to an external link
    window.open("https://your-external-link.com", "_blank");
  }}
                      >
                        Preview Demo
                      </Button>
                      <Button className="w-full sm:w-auto bg-[#F0C93D] hover:bg-[#F0C93D]/90 text-[#0B132B] font-semibold"
                      onClick={() => {
    // Added: Redirect to an external link
    window.open("https://your-external-link.com", "_blank");
  }}
                      
                      >
                        Buy Template
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Pricing */}
      <section className="py-20 px-4 sm:px-6 bg-white dark:bg-[#0B132B]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#0B132B] dark:text-white">
              Simple,{" "}
              <span style={{ color: "#F0C93D" }}>Transparent Pricing</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-white/70 max-w-2xl mx-auto">
              Choose the perfect plan for your business. All plans include
              hosting, SSL, and ongoing support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card
                  className={`p-6 sm:p-8 h-full relative border-2 ${
                    plan.popular
                      ? "border-[#F0C93D] shadow-2xl"
                      : "border shadow-lg"
                  } hover:shadow-2xl transition-all duration-300 bg-white dark:bg-[#0B132B]/80 dark:border-white/20 dark:shadow-lg dark:shadow-[#F0C93D]/5 ${
                    plan.popular ? "dark:border-[#F0C93D]" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#F0C93D] text-[#0B132B] text-sm font-bold rounded-full">
                      Most Popular
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 text-[#0B132B] dark:text-white">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 dark:text-white/70 text-sm mb-4">
                      {plan.description}
                    </p>
                    <div
                      className="text-3xl sm:text-4xl font-bold"
                      style={{ color: "#F0C93D" }}
                    >
                      {plan.price}
                      {plan.price !== "Custom" && (
                        <span className="text-sm sm:text-base text-gray-500 dark:text-white/50 font-normal">
                          {" "}
                          one-time
                        </span>
                      )}
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#F0C93D] flex-shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base text-gray-600 dark:text-white/70">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => handlePlanClick(plan)}
                    className={`w-full ${
                      plan.popular
                        ? "bg-[#F0C93D] hover:bg-[#F0C93D]/90 text-[#0B132B]"
                        : "bg-[#0B132B] hover:bg-[#0B132B]/90 dark:bg-[#F0C93D] dark:hover:bg-[#F0C93D]/90 text-white dark:text-[#0B132B]"
                    } font-semibold`}
                  >
                    Get Started
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Purchase Dialog - Only for Template plan */}
      <Dialog open={!!selectedPlan} onOpenChange={() => setSelectedPlan(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto p-4 sm:p-6">
          {selectedPlan && (
            <>
              <DialogHeader className="pr-8">
                <DialogTitle
                  className="text-xl sm:text-2xl font-bold"
                  style={{ color: "#0B132B" }}
                >
                  Choose Your Purchase Option
                </DialogTitle>
                <DialogDescription className="text-sm sm:text-base text-gray-600">
                  Select how you'd like to purchase the {selectedPlan.name} plan
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 sm:space-y-4 mt-2 sm:mt-4">
                {/* Single Purchase */}
                <Card className="p-4 sm:p-6 border-2 border-gray-200 hover:border-[#F0C93D] transition-all">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex-1">
                      <h3
                        className="text-base sm:text-lg font-bold mb-1 sm:mb-2"
                        style={{ color: "#0B132B" }}
                      >
                        Single Template Purchase
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Get one premium template customized for your business
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <div
                        className="text-xl sm:text-2xl font-bold"
                        style={{ color: "#F0C93D" }}
                      >
                        {selectedPlan.price}
                      </div>
                      <div className="text-xs text-gray-500">one-time</div>
                    </div>
                  </div>
                  <ul className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F0C93D] flex-shrink-0" />
                      1 template of your choice
                    </li>
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F0C93D] flex-shrink-0" />
                      Full customization included
                    </li>
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F0C93D] flex-shrink-0" />
                      1 year free hosting & support
                    </li>
                  </ul>
                  <Button
                    className="w-full bg-[#0B132B] hover:bg-[#0B132B]/90 text-white font-semibold text-sm sm:text-base h-9 sm:h-10"
                    onClick={() => {
                      window.open("YOUR_SINGLE_PURCHASE_LINK_HERE", "_blank");
                    }}
                  >
                    Buy Now
                  </Button>
                </Card>

                {/* Bundle Purchase */}
                <Card className="p-4 sm:p-6 border-2 border-[#F0C93D] bg-[#F0C93D]/5">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex-1">
                      <div className="inline-block px-2 py-0.5 sm:py-1 bg-[#F0C93D] text-[#0B132B] text-xs font-bold rounded mb-1 sm:mb-2">
                        BEST VALUE
                      </div>
                      <h3
                        className="text-base sm:text-lg font-bold mb-1 sm:mb-2"
                        style={{ color: "#0B132B" }}
                      >
                        Bundle Template Purchase
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Get 3 templates and save 25% - perfect for multiple
                        projects
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <div
                        className="text-xl sm:text-2xl font-bold"
                        style={{ color: "#F0C93D" }}
                      >
                        {selectedPlan.price !== "Custom"
                          ? `$${Math.round(
                              parseInt(selectedPlan.price.replace("$", "")) *
                                3 *
                                0.75
                            )}`
                          : "Custom"}
                      </div>
                      <div className="text-xs text-gray-500">one-time</div>
                      {selectedPlan.price !== "Custom" && (
                        <div className="text-xs text-[#F0C93D] font-semibold mt-1">
                          Save 25%
                        </div>
                      )}
                    </div>
                  </div>
                  <ul className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F0C93D] flex-shrink-0" />
                      3 templates of your choice
                    </li>
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F0C93D] flex-shrink-0" />
                      Full customization for all templates
                    </li>
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F0C93D] flex-shrink-0" />
                      Priority support & faster delivery
                    </li>
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F0C93D] flex-shrink-0" />
                      2 years free hosting included
                    </li>
                  </ul>
                  <Button
                    className="w-full bg-[#F0C93D] hover:bg-[#F0C93D]/90 text-[#0B132B] font-semibold text-sm sm:text-base h-9 sm:h-10"
                    onClick={() => {
                      window.open("YOUR_BUNDLE_PURCHASE_LINK_HERE", "_blank");
                    }}
                  >
                    Buy Bundle Now
                  </Button>
                </Card>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* About Section */}
      <section
        id="about"
        className="py-20 px-4 sm:px-6 bg-gray-50 dark:bg-[#0B132B]/50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-[#0B132B] dark:text-white">
                About <span style={{ color: "#F0C93D" }}>Zenova</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-white/70 mb-6 leading-relaxed">
                At Zenova, we believe every local business deserves a global
                look. We’re a modern web design studio that blends human
                creativity with cutting-edge technology to create websites that
                don’t just look good — they{" "}
                <span className="text-sm sm:text-base font-bold text-[#F0C93D] dark:text-white">
                  work hard
                </span>{" "}
                for your brand. Our mission is simple:
              </p>
              <p className="text-base sm:text-lg text-gray-600 dark:text-white/70 mb-8 leading-relaxed">
                To help small businesses, freelancers, and local brands show up
                online with confidence — through clean, fast, and
                conversion-driven design. We understand that most business
                owners don’t have time to figure out code or chase unreliable
                developers. That’s why Zenova was built differently — to make
                the website creation process fast, transparent, and stress-free
                .Whether it’s a custom design, a revamp, or a **ready-to-use
                template**, we treat every project like it’s our own brand —
                because your success is our best marketing.
              </p>
              <div className="grid grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center p-4">
                  <Code className="w-6 sm:w-8 h-6 sm:h-8 text-[#F0C93D] mx-auto mb-2" />
                  <div className="text-sm sm:text-base font-bold text-[#0B132B] dark:text-white">
                    Expert Team
                  </div>
                </div>
                <div className="text-center p-4">
                  <Rocket className="w-6 sm:w-8 h-6 sm:h-8 text-[#F0C93D] mx-auto mb-2" />
                  <div className="text-sm sm:text-base font-bold text-[#0B132B] dark:text-white">
                    Fast Delivery
                  </div>
                </div>
                <div className="text-center p-4">
                  <Sparkles className="w-6 sm:w-8 h-6 sm:h-8 text-[#F0C93D] mx-auto mb-2" />
                  <div className="text-sm sm:text-base font-bold text-[#0B132B] dark:text-white">
                    Quality First
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#F0C93D] rounded-2xl -z-10"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#0B132B] rounded-2xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 bg-white dark:bg-[#0B132B]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#0B132B] dark:text-white">
              What Our <span style={{ color: "#F0C93D" }}>Clients Say</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-white/70 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients
              have to say.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Owner, Bloom Cafe",
                content:
                  "Lunvia transformed our online presence completely. We went from having no website to a stunning, professional site in just 2 days. Our bookings have tripled!",
                avatar:
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
              },
              {
                name: "Michael Chen",
                role: "Founder, FitCore Gym",
                content:
                  "The quality and speed are unmatched. They understood our vision perfectly and delivered exactly what we needed. Highly recommend for any small business!",
                avatar:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
              },
              {
                name: "Emily Rodriguez",
                role: "Director, Haven Real Estate",
                content:
                  "Professional, responsive, and incredibly talented. Our new website has helped us close more deals and establish credibility in our market.",
                avatar:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 sm:p-8 h-full border shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-[#0B132B]/80 dark:border-white/20 dark:shadow-lg dark:shadow-[#F0C93D]/5">
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm sm:text-base font-bold text-[#0B132B] dark:text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-white/70">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-white/70 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex gap-1 mt-6">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-[#F0C93D]">
                        ★
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 px-4 sm:px-6 bg-gray-50 dark:bg-[#0B132B]/50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-[#0B132B] dark:text-white">
                Let's Build Something{" "}
                <span style={{ color: "#F0C93D" }}>Amazing</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-white/70 mb-8 leading-relaxed">
                Ready to take your business online? Get in touch with us and
                let's discuss how we can help you achieve your goals.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F0C93D]/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#F0C93D]" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-bold mb-1 text-[#0B132B] dark:text-white">
                      Email Us
                    </div>
                    <div className="text-sm sm:text-base text-gray-600 dark:text-white/70">
                      hello@lunvia.com
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F0C93D]/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#F0C93D]" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-bold mb-1 text-[#0B132B] dark:text-white">
                      Call Us
                    </div>
                    <div className="text-sm sm:text-base text-gray-600 dark:text-white/70">
                      +1 (555) 123-4567
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F0C93D]/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#F0C93D]" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-bold mb-1 text-[#0B132B] dark:text-white">
                      Visit Us
                    </div>
                    <div className="text-sm sm:text-base text-gray-600 dark:text-white/70">
                      123 Design Street, Creative City, CA 90210
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-6 sm:p-8 border shadow-2xl bg-white dark:bg-[#0B132B]/80 dark:border-white/20 dark:shadow-lg dark:shadow-[#F0C93D]/5">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#0B132B] dark:text-white">
                      Your Name
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="border-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#0B132B] dark:text-white">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="border-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#0B132B] dark:text-white">
                      Phone Number
                    </label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="border-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#0B132B] dark:text-white">
                      Tell us about your project
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="I'm looking for..."
                      className="border-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-white min-h-32"
                    />
                  </div>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    style={{ display: "none" }}
                    autoComplete="off"
                  />
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#0B132B] hover:bg-[#0B132B]/90 dark:bg-[#F0C93D] dark:hover:bg-[#F0C93D]/90 text-white dark:text-[#0B132B] font-semibold"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>

                  {status && (
                    <p
                      className={`mt-4 text-center ${
                        status.startsWith("✅")
                          ? "text-green-600"
                          : status.startsWith("❌")
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {status}
                    </p>
                  )}
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 bg-white dark:bg-[#0B132B]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#0B132B] dark:text-white">
              Frequently Asked{" "}
              <span style={{ color: "#F0C93D" }}>Questions</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-white/70 max-w-2xl mx-auto">
              Got questions? We've got answers. Here are some of the most common
              questions we receive.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-[#0B132B]/80 dark:border-white/20 dark:shadow-lg dark:shadow-[#F0C93D]/5 overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-[#0B132B] dark:text-white">
                      {item.question}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-[#F0C93D] flex-shrink-0 transition-transform duration-300 ${
                        openFaqIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFaqIndex === index ? "auto" : 0,
                      opacity: openFaqIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-sm sm:text-base text-gray-600 dark:text-white/70 leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-12 px-4 sm:px-6"
        style={{ backgroundColor: "#0B132B" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-12">
            <div>
              <div className="text-xl sm:text-2xl font-bold mb-4">
                <span className="text-white">ZENOVA</span>
                <span style={{ color: "#F0C93D" }}>STUDIO</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                crafting premium websites — powered by modern tech and
                customized for your brand — giving local businesses a global
                look that’s fast, beautiful, and built to convert.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 text-sm sm:text-base">
                Services
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-[#F0C93D] transition-colors"
                  >
                    Template Websites
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-[#F0C93D] transition-colors"
                  >
                    Custom Development
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-[#F0C93D] transition-colors"
                  >
                    E-commerce
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-[#F0C93D] transition-colors"
                  >
                    SEO Services
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 text-sm sm:text-base">
                Company
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#about"
                    className="text-white/70 hover:text-[#F0C93D] transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-[#F0C93D] transition-colors"
                  >
                    Our Work
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-[#F0C93D] transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-white/70 hover:text-[#F0C93D] transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 text-sm sm:text-base">
                Follow Us
              </h4>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#F0C93D] flex items-center justify-center transition-all group"
                >
                  <Facebook className="w-5 h-5 text-white/70 group-hover:text-[#0B132B]" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#F0C93D] flex items-center justify-center transition-all group"
                >
                  <Twitter className="w-5 h-5 text-white/70 group-hover:text-[#0B132B]" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#F0C93D] flex items-center justify-center transition-all group"
                >
                  <Instagram className="w-5 h-5 text-white/70 group-hover:text-[#0B132B]" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#F0C93D] flex items-center justify-center transition-all group"
                >
                  <Linkedin className="w-5 h-5 text-white/70 group-hover:text-[#0B132B]" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center text-white/70 text-sm">
            <p>
              © 2024 Zenova-studio. All rights reserved. Made with ❤️ for small
              businesses.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
