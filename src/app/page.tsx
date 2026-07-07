"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Shield,
  HeartPulse,
  Heart,
  Activity,
  Mic,
  MapPin,
  MessageSquare,
  Users,
  Radio,
  FileText,
  Smartphone,
  Play,
  Download,
  ExternalLink,
  Lock,
  Battery,
  Check,
  X,
  ChevronDown,
  Send,
  Zap,
  Network,
  Cpu,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Clock,
  Layers,
  Award,
  Video
} from "lucide-react";

// Custom SVG Icons for brands (since modern Lucide v0.400+ doesn't export them)
const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  organization: z.string().min(2, "Organization name must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  inquiryType: z.enum([
    "Collaboration",
    "Investment",
    "Research",
    "Pilot Program",
    "Media",
    "General Inquiry"
  ])
});

type ContactFormValues = z.infer<typeof contactSchema>;

// Animated Counter component
const Counter = ({ value, duration = 2, suffix = "" }: { value: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      if (start === end) return;

      const totalMiliseconds = duration * 1000;
      const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 20);
      
      const timer = setInterval(() => {
        start += 1;
        setCount(Math.min(start, end));
        if (start >= end) {
          clearInterval(timer);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<"safewalk" | "traditional">("safewalk");
  const [demoState, setDemoState] = useState<"idle" | "monitoring" | "countdown" | "alerted">("idle");
  const [countdown, setCountdown] = useState(5);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [activeCapability, setActiveCapability] = useState(0);
  const [activeCyclePhase, setActiveCyclePhase] = useState(0);
  const [isAutoCycleActive, setIsAutoCycleActive] = useState(true);

  // Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      inquiryType: "Collaboration"
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsFormSubmitted(true);
    reset();
  };

  // Demo simulation effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (demoState === "countdown") {
      setCountdown(5);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setDemoState("alerted");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [demoState]);

  // Auto-cycle active capability every 3 seconds
  useEffect(() => {
    if (!isAutoCycleActive) return;
    const interval = setInterval(() => {
      setActiveCapability((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, [isAutoCycleActive]);

  // Scroll logic for navbar opacity
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-slate-900 bg-dot-pattern">
      {/* 3D Perspective Grid with White Lines (Moving Background Effect) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10" style={{ perspective: "450px", perspectiveOrigin: "50% 30%" }}>
        <div className="perspective-grid-white" />
      </div>
      {/* Background Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-50/50 blur-[120px] pointer-events-none -z-10 animate-float" />
      <div className="absolute top-[30%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-blue-50/40 blur-[120px] pointer-events-none -z-10 animate-float-delayed" />
      <div className="absolute bottom-[10%] left-[5%] w-[40vw] h-[40vw] rounded-full bg-slate-50/50 blur-[100px] pointer-events-none -z-10" />

      {/* Background Moving Lines from Corners */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[5%] left-0 w-[40%] h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full animate-slide-right-1" />
        <div className="absolute top-[35%] left-0 w-[50%] h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent -translate-x-full animate-slide-right-2" />
        <div className="absolute top-[70%] left-0 w-[45%] h-[1px] bg-gradient-to-r from-transparent via-primary/15 to-transparent -translate-x-full animate-slide-right-3" />
      </div>

      {/* 1. HEADER / NAVIGATION */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "glass-container-strong py-4 shadow-sm border-b border-slate-200/80"
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="SafeWalk Logo"
              width={48}
              height={48}
              className="rounded-xl shadow-sm"
            />
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              Safe<span className="text-primary">Walk</span>
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-600">
            <a href="#problem" className="hover:text-primary transition-colors">
              The Problem
            </a>
            <a href="#why-safewalk" className="hover:text-primary transition-colors">
              Why SafeWalk
            </a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#features" className="hover:text-primary transition-colors">
              Features
            </a>
            <a href="#technology" className="hover:text-primary transition-colors">
              Technology
            </a>
            <a href="#roadmap" className="hover:text-primary transition-colors">
              Roadmap
            </a>
            <a href="#download" className="hover:text-primary transition-colors">
              Request Link
            </a>
            <a href="#faq" className="hover:text-primary transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#demo"
              className="hidden lg:inline-block text-xs font-bold text-slate-700 hover:text-primary transition-colors"
            >
              Watch Demo
            </a>
            <a
              href="#download"
              className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-sm hover:shadow transition-all duration-200 hover:scale-[1.02]"
            >
              Download App
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-12 pb-24 overflow-hidden">
        {/* Hero Background Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          {/* Neon radial soft glow orbs */}
          <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-indigo-200/25 blur-[120px] animate-float" />
          <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-blue-200/25 blur-[140px] animate-pulse-slow" />
          
          {/* Sliding diagonal neon line sweeps */}
          <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/15 to-transparent rotate-[-12deg] transform scale-150 animate-pulse" />
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/15 to-transparent rotate-[12deg] transform scale-150 animate-pulse-slow" />
          
          {/* Subtle grid mesh overlays */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light/50 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary">
                Proactive Safety AI Edition
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-tight">
              SafeWalk <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Every Second Matters.
              </span>
            </h1>

            <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
              AI-powered personal safety platform that automatically detects emergencies, alerts trusted contacts, and works even without internet connectivity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#download"
                className="px-8 py-4 rounded-full bg-primary hover:bg-primary-hover text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group hover:scale-[1.02]"
              >
                Download App <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#demo"
                className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold border border-slate-200 shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2"
              >
                Watch Demo <Play className="w-4 h-4 fill-slate-800" />
              </a>
            </div>
          </div>

          {/* Hero Right Mockup */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Ambient background glow for phone */}
            <div className="absolute w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-primary/10 to-accent/10 blur-[60px] pointer-events-none -z-10 animate-pulse-slow" />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[480px]"
            >
              <Image
                src="/images/phnoimg.png"
                alt="SafeWalk Smartphone Interface"
                width={480}
                height={960}
                className="w-full h-auto"
                priority
                fetchPriority="high"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. THE SCENARIO PAGE */}
      <section id="problem" className="w-full bg-transparent pt-12 pb-12 scroll-mt-[96px]">
        <div className="max-w-[1100px] mx-auto px-6 relative">
          <Image
            src="/images/reality.png"
            alt="SafeWalk Reality Scenario & Solution"
            width={1100}
            height={733}
            className="w-full h-auto block rounded-[24px] border border-slate-200/60 shadow-lg bg-white"
            priority
            sizes="(max-width: 1200px) 100vw, 1100px"
          />
        </div>
      </section>

      {/* 4. WHY SAFEWALK (COMPARISON) */}
      <section id="why-safewalk" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
              Direct Comparison
            </h2>
            <p className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Compare Features
            </p>
            <p className="text-slate-500 mt-4 max-w-lg mx-auto">
              See how SafeWalk completely changes the emergency monitoring framework compared to traditional apps.
            </p>

            {/* Mobile Tab Switcher */}
            <div className="mt-8 flex justify-center">
              <div className="p-1 rounded-full bg-slate-100 flex items-center border border-slate-200">
                <button
                  onClick={() => setActiveTab("safewalk")}
                  className={`px-6 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                    activeTab === "safewalk"
                      ? "bg-white text-primary shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  SafeWalk Advantages
                </button>
                <button
                  onClick={() => setActiveTab("traditional")}
                  className={`px-6 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                    activeTab === "traditional"
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Traditional Apps
                </button>
              </div>
            </div>
          </div>

          {/* Feature Grid Side-by-Side Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* SafeWalk Column */}
            <motion.div
              animate={{ opacity: activeTab === "safewalk" ? 1 : 0.6 }}
              className={`p-8 rounded-[32px] border transition-all duration-300 ${
                activeTab === "safewalk"
                  ? "bg-white border-primary/20 shadow-lg ring-1 ring-primary/5"
                  : "bg-slate-50/50 border-slate-200/50"
              }`}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">SafeWalk Solution</h3>
              </div>

              <div className="space-y-6">
                {[
                  { title: "Automatic Detection", desc: "No manual triggers required. Accel, gyro, and voice fusion engine detect emergencies instantly." },
                  { title: "Offline SMS", desc: "Alerts go out even without cellular data/internet, using encoded local SMS blocks." },
                  { title: "Voice Trigger", desc: "Activate a panic alert using customizable voice keyphrases even if your phone is locked." },
                  { title: "Guardian Mode", desc: "A smart background daemon that adapts sensor check periods dynamically to save battery." },
                  { title: "Live Location", desc: "Pins live tracking updates onto a lightweight dashboard viewable by contacts." },
                  { title: "Audio Recording", desc: "Immediately records ambient audio evidence during alerts and uploads to safety cloud." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-success/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-success" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-800">{item.title}</h4>
                      <p className="text-xs text-slate-600 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Traditional Apps Column */}
            <motion.div
              animate={{ opacity: activeTab === "traditional" ? 1 : 0.6 }}
              className={`p-8 rounded-[32px] border transition-all duration-300 ${
                activeTab === "traditional"
                  ? "bg-white border-slate-300 shadow-lg"
                  : "bg-slate-50/50 border-slate-200/50"
              }`}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <X className="w-5 h-5 text-slate-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Traditional Safety Apps</h3>
              </div>

              <div className="space-y-6">
                {[
                  { title: "Need Manual SOS", desc: "Requires you to pull out your phone, unlock the screen, open the app, and hold down a button." },
                  { title: "Need Internet", desc: "If you have poor connection or zero data, alerts are queued and fail to send in real time." },
                  { title: "No Automatic Detection", desc: "Completely blind to hard falls, high impacts, physical assaults, or consciousness loss." },
                  { title: "No Voice SOS", desc: "If you cannot move your arms, you are completely unable to interact or notify anyone." },
                  { title: "No Evidence Collection", desc: "Zero security logging or recording of environmental sounds to aid authorities later." },
                  { title: "No Background Monitoring", desc: "Requires persistent foreground system execution which drains device batteries quickly." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-red-100/80 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-4 h-4 text-emergency" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-800">{item.title}</h4>
                      <p className="text-xs text-slate-600 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (INTERACTIVE STEPPER) */}
      <section id="how-it-works" className="py-24 bg-transparent border-y border-slate-200/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
              Workflow Flowchart
            </h2>
            <p className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Interactive Emergency Path
            </p>
            <p className="text-slate-500 mt-4 max-w-lg mx-auto">
              Follow the millisecond timeline of what happens when SafeWalk detects a critical anomaly. Hover or tap nodes to navigate.
            </p>
          </div>

          {/* Stepper Timeline (Vertical on Mobile, Interactive Nodes) */}
          <div className="max-w-4xl mx-auto relative pl-8 md:pl-0">
            {/* Center line (Desktop) / Left line (Mobile) */}
            <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2" />
            
            {/* Active connecting progress bar */}
            <div
              className="absolute left-3 md:left-1/2 top-0 w-0.5 bg-primary -translate-x-1/2 transition-all duration-500 ease-out"
              style={{
                height: `${(activeStep / 9) * 100}%`,
                maxHeight: "100%"
              }}
            />

            {[
              { step: "01", name: "Guardian Mode Active", desc: "System initiates background background tasks, scaling down checks based on movement status to prevent battery drain." },
              { step: "02", name: "Sensor Monitoring", desc: "High-frequency collection of accelerometer, gyroscope, microphone, and barometer streams." },
              { step: "03", name: "AI Detection Engine", desc: "Local neural network processes sensor patterns to differentiate normal activities from emergency profiles." },
              { step: "04", name: "Emergency Identified", desc: "Critical anomaly detected (e.g., impact signature followed by prolonged absolute immobility)." },
              { step: "05", name: "Audio Countdown", desc: "Initiates a clear, progressive audio warning and physical vibration, offering a 10-second cancel window." },
              { step: "06", name: "SOS Trigger", desc: "If not aborted by user, emergency protocol begins instantly." },
              { step: "07", name: "Live GPS Verification", desc: "High-accuracy lock established on current coordinate location." },
              { step: "08", name: "Offline SMS Dispatch", desc: "Binary-packed data alerts sent immediately via SMS channels if no internet is detected." },
              { step: "09", name: "Emergency Contacts Notified", desc: "Contacts receive SMS warnings with maps, live links, and ambient audio details." },
              { step: "10", name: "Emergency Response", desc: "Medical teams or contacts secure your exact location with active route details." }
            ].map((step, idx) => {
              const isEven = idx % 2 === 0;
              const isActive = activeStep === idx;
              return (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="relative mb-12 last:mb-0 min-h-[100px]"
                >
                  
                  {/* Step Bubble Indicator */}
                  {isActive ? (
                    <div className="absolute left-3 md:left-1/2 top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-primary border-2 border-primary shadow-lg flex items-center justify-center z-20 scale-125 transition-all duration-300">
                      <span className="text-[10px] font-bold text-white">{step.step}</span>
                      <span className="absolute inset-0 rounded-full border border-primary/40 animate-ping pointer-events-none" />
                    </div>
                  ) : (
                    <div
                      onClick={() => setActiveStep(idx)}
                      onMouseEnter={() => setActiveStep(idx)}
                      className="absolute left-3 md:left-1/2 top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-slate-200 shadow-sm flex items-center justify-center z-10 hover:border-primary hover:scale-110 transition-all duration-200 cursor-pointer"
                    >
                      <span className="text-[10px] font-bold text-slate-500">{step.step}</span>
                    </div>
                  )}

                  {/* Step Card */}
                  <div className={`md:w-[45%] ${isEven ? "md:ml-auto md:text-left pl-8 md:pl-12" : "md:mr-auto md:text-right pl-8 md:pl-0 md:pr-12"}`}>
                    <motion.div
                      onClick={() => setActiveStep(idx)}
                      onMouseEnter={() => setActiveStep(idx)}
                      variants={{
                        hidden: {
                          boxShadow: "0 0px 0px rgba(79, 70, 229, 0)",
                          borderColor: "rgba(226, 232, 240, 0.6)"
                        },
                        visible: {
                          boxShadow: [
                            "0 0px 0px rgba(79, 70, 229, 0)",
                            "0 10px 40px rgba(79, 70, 229, 0.35)",
                            isActive
                              ? "0 10px 30px rgba(79, 70, 229, 0.15)"
                              : "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
                          ],
                          borderColor: isActive ? "#4f46e5" : "rgba(226, 232, 240, 0.8)",
                          transition: { duration: 1.5, ease: "easeOut" }
                        }
                      }}
                      className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "bg-white border-primary shadow-lg ring-2 ring-primary/10 scale-[1.02] opacity-100"
                          : "bg-white/80 border-slate-200/60 shadow-sm opacity-55 hover:opacity-90"
                      }`}
                    >
                      <h4 className={`text-base font-bold transition-colors ${isActive ? "text-primary" : "text-slate-800"}`}>
                        {step.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">{step.desc}</p>
                    </motion.div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. FEATURES GRID */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
              Features
            </h2>
            <p className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Safety Engineering Capabilities
            </p>
            <p className="text-slate-500 mt-4 max-w-lg mx-auto">
              Every detail is designed to optimize reliability, response speed, and privacy. Hover or click capabilities to view the diagnostic console.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
            {/* Left Column: Selectable list of Capabilities */}
            <div
              className="lg:col-span-5 flex flex-col gap-4"
              onMouseEnter={() => setIsAutoCycleActive(false)}
              onMouseLeave={() => setIsAutoCycleActive(true)}
            >
              {[
                { id: 0, icon: Shield, title: "Guardian Mode Active", desc: "Intelligent background daemon that wakes up when motion triggers suggest safety is compromised.", tag: "BACKGROUND DAEMON", tagColor: "bg-indigo-50 text-indigo-600 border-indigo-100/50" },
                { id: 1, icon: Activity, title: "Sensor Fusion Engine", desc: "Integrates signals from accelerometer, gyroscope, and barometer to construct a clean spatial vector.", tag: "SENSOR FUSION", tagColor: "bg-blue-50 text-blue-600 border-blue-100/50" },
                { id: 2, icon: HeartPulse, title: "AI Fall Detection Model", desc: "Proprietary on-device model that analyzes acceleration spikes followed by prolonged immobility.", tag: "EDGE COMPUTE", tagColor: "bg-red-50 text-red-600 border-red-100/50" },
                { id: 3, icon: Mic, title: "Voice Trigger SOS", desc: "Allows hands-free trigger via encrypted voice keywords when user cannot move their hands.", tag: "HANDS-FREE", tagColor: "bg-purple-50 text-purple-600 border-purple-100/50" },
                { id: 4, icon: MessageSquare, title: "Offline SMS Alerts", desc: "Relies on standard local SMS bands to send coordinates if network data is disconnected.", tag: "ZERO CONNECTIVITY", tagColor: "bg-amber-50 text-amber-600 border-amber-100/50" },
                { id: 5, icon: Lock, title: "Device Privacy Vault", desc: "All calculations computed locally on the processor. No constant cloud monitoring or data streams.", tag: "PRIVACY FIRST", tagColor: "bg-teal-50 text-teal-600 border-teal-100/50" }
              ].map((cap, idx) => {
                const IconComp = cap.icon;
                const isActive = activeCapability === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setActiveCapability(idx);
                      setIsAutoCycleActive(false);
                    }}
                    onMouseEnter={() => setActiveCapability(idx)}
                    className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex gap-4 text-left ${
                      isActive
                        ? "bg-white border-primary shadow-md ring-2 ring-primary/5 scale-[1.02]"
                        : "bg-white/60 border-slate-200/60 hover:bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center transition-colors ${
                      isActive ? "bg-primary/10 text-primary" : "bg-slate-50 text-slate-500"
                    }`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center gap-2 flex-wrap">
                        <h4 className={`text-sm font-bold transition-colors ${isActive ? "text-primary" : "text-slate-800"}`}>
                          {cap.title}
                        </h4>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase border tracking-wider ${cap.tagColor}`}>
                          {cap.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{cap.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Dynamic Engineering Console Visualizer */}
            <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200 shadow-premium p-6 md:p-8 flex flex-col justify-between min-h-[500px]">
              
              {/* Console Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                  <span className="font-mono text-[10px] tracking-widest uppercase text-slate-800 font-bold">
                    SafeWalk Core Runtime Console
                  </span>
                </div>
                <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest font-bold">
                  SYSTEM_STATE: MONITORING
                </span>
              </div>

              {/* SVG Wave Visualizations depending on activeCapability */}
              <div className="flex-1 flex flex-col justify-center items-center py-6 min-h-[220px]">
                {activeCapability === 0 && (
                  /* Guardian Mode: slow breathing pulse waves */
                  <div className="w-full space-y-4">
                    <div className="h-20 w-full flex items-center justify-center gap-1.5 px-6">
                      {[0.4, 0.6, 0.8, 1, 0.8, 0.6, 0.4].map((h, i) => (
                        <motion.div
                          key={i}
                          animate={{ height: [20, 60, 20] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                          className="w-2 rounded-full bg-indigo-500/80"
                        />
                      ))}
                    </div>
                    <p className="text-[10px] font-mono text-slate-500 text-center uppercase tracking-wider">
                      Background Daemon Thread: SLEEPING (Standby mode engaged)
                    </p>
                  </div>
                )}

                {activeCapability === 1 && (
                  /* Sensor Fusion: three overlapping sine waves */
                  <div className="w-full space-y-4">
                    <svg viewBox="0 0 400 100" className="w-full h-24 overflow-visible">
                      {/* ACCEL X */}
                      <motion.path
                        d="M 0 50 Q 50 10, 100 50 T 200 50 T 300 50 T 400 50"
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="2"
                        animate={{ strokeDashoffset: [0, 400] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        strokeDasharray="400"
                      />
                      {/* GYRO Y */}
                      <motion.path
                        d="M 0 50 Q 50 90, 100 50 T 200 50 T 300 50 T 400 50"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="1.5"
                        animate={{ strokeDashoffset: [0, -400] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        strokeDasharray="400"
                        opacity="0.7"
                      />
                      {/* BARO Z */}
                      <motion.path
                        d="M 0 50 Q 50 30, 100 50 T 200 50 T 300 50 T 400 50"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="1"
                        animate={{ strokeDashoffset: [400, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        strokeDasharray="400"
                        opacity="0.5"
                      />
                    </svg>
                    <p className="text-[10px] font-mono text-slate-500 text-center uppercase tracking-wider">
                      Sensor Fusion Streams: Accelerometer (X,Y) + Gyroscope + Barometer
                    </p>
                  </div>
                )}

                {activeCapability === 2 && (
                  /* Fall Detection: giant spike animation */
                  <div className="w-full space-y-4">
                    <div className="h-24 w-full flex items-center justify-center">
                      <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible">
                        <motion.path
                          d="M 0 50 L 150 50 L 170 10 L 190 90 L 210 50 L 400 50"
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="2.5"
                          strokeDasharray="400"
                          animate={{ strokeDashoffset: [400, 0] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                        />
                      </svg>
                    </div>
                    <p className="text-[10px] font-mono text-slate-500 text-center uppercase tracking-wider">
                      Local AI Engine State: Neural Network checking vectors (Nominal)
                    </p>
                  </div>
                )}

                {activeCapability === 3 && (
                  /* Voice Trigger: mic sound wave oscillations */
                  <div className="w-full space-y-4 flex flex-col items-center">
                    <div className="relative w-20 h-20 flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        className="absolute inset-0 rounded-full bg-purple-500/10 border border-purple-500/30"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.7, ease: "easeOut" }}
                        className="absolute inset-2 rounded-full bg-purple-500/20 border border-purple-400/40"
                      />
                      <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center relative z-10">
                        <Mic className="w-5 h-5" />
                      </div>
                    </div>
                    <p className="text-[10px] font-mono text-slate-500 text-center uppercase tracking-wider">
                      Encrypted Voice Wakeup Loop: Hotword Detection ACTIVE
                    </p>
                  </div>
                )}

                {activeCapability === 4 && (
                  /* Offline SMS: cell towers + coordinates text */
                  <div className="w-full space-y-4 text-center font-mono">
                    <div className="flex justify-center items-end gap-1 h-12 mb-2">
                      <div className="w-2.5 h-3 bg-amber-500/80 rounded-sm" />
                      <div className="w-2.5 h-5 bg-amber-500/80 rounded-sm" />
                      <div className="w-2.5 h-7 bg-amber-500/80 rounded-sm" />
                      <div className="w-2.5 h-9 bg-amber-500/80 rounded-sm" />
                      <div className="w-2.5 h-11 bg-amber-500/80 rounded-sm animate-pulse" />
                    </div>
                    <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200/60 max-w-xs mx-auto">
                      <p className="text-[9px] text-slate-400 mb-1 font-bold">SENDING SMS CELL DATA</p>
                      <p className="text-slate-800 font-bold">LAT: 12.9716</p>
                      <p className="text-slate-800 font-bold">LNG: 77.5946</p>
                      <p className="text-amber-600 font-bold">STATUS: PACKET_SENT_OK</p>
                    </div>
                  </div>
                )}

                {activeCapability === 5 && (
                  /* Privacy Shield: safe lock icon scan */
                  <div className="w-full space-y-4 flex flex-col items-center">
                    <motion.div
                      animate={{ rotateY: [0, 180, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="w-16 h-16 rounded-2xl bg-indigo-50 border border-primary/20 flex items-center justify-center text-primary"
                    >
                      <Lock className="w-8 h-8" />
                    </motion.div>
                    <p className="text-[10px] font-mono text-slate-500 text-center uppercase tracking-wider">
                      Secure On-Device Vault: Sandboxed local processing only
                    </p>
                  </div>
                )}
              </div>

              {/* Terminal Diagnostic Logs Console Output */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 font-mono text-[10px] text-slate-700 space-y-1 text-left select-none overflow-y-auto max-h-[140px] w-full">
                {activeCapability === 0 && (
                  <>
                    <p className="text-slate-400">{"[12:44:02] INITIALIZING DAEMON ENGINE..."}</p>
                    <p className="text-slate-700 font-medium">{"[12:44:02] Guardian Mode active. Background process verified."}</p>
                    <p className="text-slate-700 font-medium">{"[12:44:03] GPS frequency: dynamically scaled to 0.1Hz based on rest state."}</p>
                    <p className="text-indigo-600 font-bold">{"[12:44:03] Battery savings active: low CPU frequency sleep cycle engaged."}</p>
                  </>
                )}
                {activeCapability === 1 && (
                  <>
                    <p className="text-slate-400">{"[12:44:05] SENSOR STREAM INTEGRATION ONLINE..."}</p>
                    <p className="text-slate-700 font-medium">{"[12:44:05] Accelerometer X/Y/Z streaming at 50Hz."}</p>
                    <p className="text-slate-700 font-medium">{"[12:44:06] Gyroscope angular velocity vectors integrated."}</p>
                    <p className="text-blue-600 font-bold">{"[12:44:06] Low-pass filtering completed: sensor noise reduced by 94.2%."}</p>
                  </>
                )}
                {activeCapability === 2 && (
                  <>
                    <p className="text-slate-400">{"[12:44:08] AI DETECTION SYSTEM ARMED..."}</p>
                    <p className="text-slate-700 font-medium">{"[12:44:08] Local feed checking against safety neural network thresholds."}</p>
                    <p className="text-slate-700 font-medium">{"[12:44:09] Force magnitude: 0.98g (Walking threshold nominal)."}</p>
                    <p className="text-red-600 font-bold">{"[12:44:09] Fall impact signature detection model status: ACTIVE."}</p>
                  </>
                )}
                {activeCapability === 3 && (
                  <>
                    <p className="text-slate-400">{"[12:44:11] AUDIO MONITORING CORE INITIALIZED..."}</p>
                    <p className="text-slate-700 font-medium">{"[12:44:11] Micro-buffer active: strictly running in volatile local RAM."}</p>
                    <p className="text-slate-700 font-medium">{"[12:44:12] Pattern dictionary: 'help', 'save me', 'alert' voice vectors loaded."}</p>
                    <p className="text-purple-600 font-bold">{"[12:44:12] Security verification: audio data zero-overwritten immediately."}</p>
                  </>
                )}
                {activeCapability === 4 && (
                  <>
                    <p className="text-slate-400">{"[12:44:14] TELEMETRY DISPATCH SUBSYSTEM ONLINE..."}</p>
                    <p className="text-slate-700 font-medium">{"[12:44:14] Cellular band search: GSM/CDMA tower lock confirmed."}</p>
                    <p className="text-slate-700 font-medium">{"[12:44:15] Alert payload size: 68 bytes packed coordinate string."}</p>
                    <p className="text-amber-600 font-bold">{"[12:44:15] Connectivity fallback: dispatching SMS to Emergency Contacts."}</p>
                  </>
                )}
                {activeCapability === 5 && (
                  <>
                    <p className="text-slate-400">{"[12:44:18] SANDBOX SECURITY INITIATED..."}</p>
                    <p className="text-slate-700 font-medium">{"[12:44:18] Network gateway: telemetry outgoing channels: DISABLED."}</p>
                    <p className="text-slate-700 font-medium">{"[12:44:19] Local encryption vault status: AES-256-GCM cipher active."}</p>
                    <p className="text-teal-600 font-bold">{"[12:44:19] Privacy audit: zero data has exited the hardware boundary."}</p>
                  </>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 7. LIVE DEMO & ASSETS */}
      <section id="demo" className="py-24 bg-transparent border-y border-slate-200/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
              Media & Assets
            </h2>
            <p className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Watch The Demo In Action
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            
            {/* Interactive Mockup Presentation (Light Theme) */}
            <div className="relative aspect-video rounded-3xl bg-white overflow-hidden shadow-premium border border-slate-200/60 flex items-center justify-center">
              
              {/* Reference Image Background Link */}
              <div className="absolute inset-0 bg-slate-50/40 bg-dot-pattern flex flex-col items-center justify-center p-6 text-center">
                <Video className="w-16 h-16 text-primary mb-4 animate-pulse" />
                <h4 className="text-xl font-extrabold text-slate-900">SafeWalk Walkthrough Demo</h4>
                <p className="text-xs text-slate-500 mt-2 max-w-md leading-relaxed">
                  Simulating fall detection algorithms, cellular network dropouts, SMS warnings, and emergency coordinator loops.
                </p>
                <div className="mt-6 px-6 py-3 rounded-full bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-2 hover:scale-105">
                  <Play className="w-4 h-4 fill-white" />
                  Play Simulated Walkthrough
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 8. TECHNOLOGY & ARCHITECTURE */}
      <section id="technology" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
              System Architecture
            </h2>
            <p className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Data Processing Model
            </p>
            <p className="text-slate-500 mt-4 max-w-lg mx-auto">
              How signals route from physical mobile hardware up to distributed rescue services.
            </p>
          </div>

          {/* Graphical Flow Layout */}
          <div className="p-8 md:p-12 rounded-[32px] bg-slate-50 border border-slate-200/60 max-w-5xl mx-auto">
            
            {/* Desktop Architecture Line Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center relative items-center">
              
              {[
                { title: "Smartphone Sensors", desc: "Accelerometer, Gyroscope, Barometer, Microphone", icon: Smartphone },
                { title: "Sensor Fusion Engine", desc: "Filter algorithms (Kalman, Low-pass)", icon: Layers },
                { title: "Local AI Detection", desc: "Machine Learning fall/impact signatures", icon: Cpu },
                { title: "Decision Layer", desc: "Validates alerts against thresholds & profiles", icon: Network },
                { title: "Emergency Engine", desc: "GPS coordinates, Offline SMS, Cloud sync", icon: Radio }
              ].map((node, idx) => {
                const IconComp = node.icon;
                return (
                  <div key={idx} className="flex flex-col items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative z-10 min-h-[220px] justify-between">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <IconComp className="w-5 h-5 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-slate-800">{node.title}</h4>
                      <p className="text-[10px] text-slate-500 leading-relaxed">{node.desc}</p>
                    </div>
                    <span className="text-[10px] font-bold text-primary-hover uppercase mt-4 tracking-wider">Level 0{idx + 1}</span>
                  </div>
                );
              })}

            </div>

            {/* Downstream Outputs */}
            <div className="mt-8 pt-8 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {[
                { title: "GPS Tracking", desc: "High-precision location tracking vectors", col: "Indigo" },
                { title: "Offline SMS Hub", desc: "Automated binary cellular signal alerts", col: "Emerald" },
                { title: "Safety Cloud Backup", desc: "Encrypted audio and status recording vaults", col: "Amber" }
              ].map((out, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">OUTBOUND</h4>
                  <h3 className="text-sm font-bold text-slate-800 mt-2">{out.title}</h3>
                  <p className="text-[10px] text-slate-500 mt-1">{out.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>



      {/* 10. USE CASES */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
              Target Groups
            </h2>
            <p className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Built For Vulnerable Moments
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              "Women Safety",
              "Students",
              "Senior Citizens",
              "Night Travelers",
              "Delivery Personnel",
              "Outdoor Adventure",
              "Medical Emergencies",
              "Campus Safety",
              "Industrial Workers"
            ].map((useCase, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/60 shadow-sm hover:shadow transition-all duration-300 hover:border-slate-300 flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary group-hover:scale-150 transition-transform" />
                  <span className="text-sm font-bold text-slate-800">{useCase}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-primary transition-all" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FUTURE ROADMAP */}
      <section id="roadmap" className="py-24 bg-transparent border-y border-slate-200/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
              Roadmap
            </h2>
            <p className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Future Roadmap Milestones
            </p>
            <p className="text-slate-500 mt-4 max-w-lg mx-auto">
              Our development timeline expanding capabilities across wearables, mesh frameworks, and emergency systems. Hover to pause.
            </p>
          </div>
        </div>

        {/* Infinite River Flow Marquee Container */}
        <div className="overflow-hidden w-full relative py-4 bg-slate-50/30 border-y border-slate-200/20">
          {/* Side Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee flex gap-6">
            {/* First Set of Roadmap Items */}
            {[
              { year: "Q1 2026", title: "SafeWalk MVP", desc: "Core fall sensor algorithms, offline SOS, and contacts alert engine.", icon: Shield, status: "SHIPPED", statusClass: "bg-emerald-50 text-emerald-600 border-emerald-100" },
              { year: "Q2 2026", title: "Wearable Integration", desc: "Bluetooth integration with smart bands and accessory triggers.", icon: Smartphone, status: "DEVELOPING", statusClass: "bg-blue-50 text-blue-600 border-blue-100 border-dashed" },
              { year: "Q3 2026", title: "Smart Watch Support", desc: "Dedicated WatchOS and WearOS companion apps with direct sensor loops.", icon: Clock, status: "PLANNED", statusClass: "bg-slate-50 text-slate-500 border-slate-200" },
              { year: "Q4 2026", title: "Mesh Communication", desc: "Encrypted device-to-device mesh forwarding alerts when cellular is lost.", icon: Network, status: "PLANNED", statusClass: "bg-slate-50 text-slate-500 border-slate-200" },
              { year: "Q1 2027", title: "AI Risk Prediction", desc: "Predictive threat scoring based on safety trends and location patterns.", icon: Cpu, status: "PLANNED", statusClass: "bg-slate-50 text-slate-500 border-slate-200" },
              { year: "Q2 2027", title: "Campus Safety Platform", desc: "Central dashboards for universities and corporate safety control centers.", icon: Users, status: "PLANNED", statusClass: "bg-slate-50 text-slate-500 border-slate-200" },
              { year: "Q3 2027", title: "Smart City Integration", desc: "Direct coordinate feeds into public street security devices.", icon: MapPin, status: "PLANNED", statusClass: "bg-slate-50 text-slate-500 border-slate-200" },
              { year: "Q4 2027", title: "Emergency Services", desc: "Direct telemetry handshakes with national 911/112 dispatch protocols.", icon: Radio, status: "PLANNED", statusClass: "bg-slate-50 text-slate-500 border-slate-200" }
            ].map((road, idx) => {
              const IconComp = road.icon;
              return (
                <div key={`set1-${idx}`} className="w-[280px] shrink-0 p-6 rounded-2xl bg-white border border-slate-200/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative flex flex-col justify-between group">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-primary/10 group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
                        <IconComp className="w-5 h-5 text-slate-500 group-hover:text-primary transition-colors" />
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase border tracking-wider ${road.statusClass}`}>
                        {road.status}
                      </span>
                    </div>
                    <span className="text-[10px] font-extrabold text-primary uppercase tracking-widest">{road.year}</span>
                    <h4 className="text-sm font-extrabold text-slate-800 mt-1.5 group-hover:text-primary transition-colors">{road.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">{road.desc}</p>
                  </div>
                  
                  <div className="h-[2px] w-full bg-slate-100 mt-6 relative">
                    <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white shadow-sm transition-all duration-300 group-hover:scale-125 ${
                      road.status === "SHIPPED"
                        ? "bg-success"
                        : road.status === "DEVELOPING"
                        ? "bg-primary animate-ping"
                        : "bg-slate-300"
                    }`} />
                    {road.status === "DEVELOPING" && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white shadow-sm bg-primary" />
                    )}
                  </div>
                </div>
              );
            })}

            {/* Duplicated Second Set for Infinite Loop */}
            {[
              { year: "Q1 2026", title: "SafeWalk MVP", desc: "Core fall sensor algorithms, offline SOS, and contacts alert engine.", icon: Shield, status: "SHIPPED", statusClass: "bg-emerald-50 text-emerald-600 border-emerald-100" },
              { year: "Q2 2026", title: "Wearable Integration", desc: "Bluetooth integration with smart bands and accessory triggers.", icon: Smartphone, status: "DEVELOPING", statusClass: "bg-blue-50 text-blue-600 border-blue-100 border-dashed" },
              { year: "Q3 2026", title: "Smart Watch Support", desc: "Dedicated WatchOS and WearOS companion apps with direct sensor loops.", icon: Clock, status: "PLANNED", statusClass: "bg-slate-50 text-slate-500 border-slate-200" },
              { year: "Q4 2026", title: "Mesh Communication", desc: "Encrypted device-to-device mesh forwarding alerts when cellular is lost.", icon: Network, status: "PLANNED", statusClass: "bg-slate-50 text-slate-500 border-slate-200" },
              { year: "Q1 2027", title: "AI Risk Prediction", desc: "Predictive threat scoring based on safety trends and location patterns.", icon: Cpu, status: "PLANNED", statusClass: "bg-slate-50 text-slate-500 border-slate-200" },
              { year: "Q2 2027", title: "Campus Safety Platform", desc: "Central dashboards for universities and corporate safety control centers.", icon: Users, status: "PLANNED", statusClass: "bg-slate-50 text-slate-500 border-slate-200" },
              { year: "Q3 2027", title: "Smart City Integration", desc: "Direct coordinate feeds into public street security devices.", icon: MapPin, status: "PLANNED", statusClass: "bg-slate-50 text-slate-500 border-slate-200" },
              { year: "Q4 2027", title: "Emergency Services", desc: "Direct telemetry handshakes with national 911/112 dispatch protocols.", icon: Radio, status: "PLANNED", statusClass: "bg-slate-50 text-slate-500 border-slate-200" }
            ].map((road, idx) => {
              const IconComp = road.icon;
              return (
                <div key={`set2-${idx}`} className="w-[280px] shrink-0 p-6 rounded-2xl bg-white border border-slate-200/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative flex flex-col justify-between group">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-primary/10 group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
                        <IconComp className="w-5 h-5 text-slate-500 group-hover:text-primary transition-colors" />
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase border tracking-wider ${road.statusClass}`}>
                        {road.status}
                      </span>
                    </div>
                    <span className="text-[10px] font-extrabold text-primary uppercase tracking-widest">{road.year}</span>
                    <h4 className="text-sm font-extrabold text-slate-800 mt-1.5 group-hover:text-primary transition-colors">{road.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">{road.desc}</p>
                  </div>
                  
                  <div className="h-[2px] w-full bg-slate-100 mt-6 relative">
                    <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white shadow-sm transition-all duration-300 group-hover:scale-125 ${
                      road.status === "SHIPPED"
                        ? "bg-success"
                        : road.status === "DEVELOPING"
                        ? "bg-primary animate-ping"
                        : "bg-slate-300"
                    }`} />
                    {road.status === "DEVELOPING" && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white shadow-sm bg-primary" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>



      {/* 14. JOURNEY */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
              Journey
            </h2>
            <p className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Project Development Cycle
            </p>
            <p className="text-slate-500 mt-4 max-w-lg mx-auto">
              Follow our execution timeline from initial idea conception up to field testing and drop validation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
            {/* Left side: interactive tab buttons */}
            <div className="md:col-span-5 flex flex-col gap-3 justify-center">
              {[
                { title: "Idea Conception", label: "PHASE 01" },
                { title: "Academic Validation", label: "PHASE 02" },
                { title: "Problem Verification", label: "PHASE 03" },
                { title: "High-Fidelity Prototype", label: "PHASE 04" },
                { title: "Active App Development", label: "PHASE 05" },
                { title: "Testing & Validation", label: "PHASE 06" },
                { title: "Future Expansion", label: "PHASE 07" }
              ].map((phase, idx) => {
                const isActive = activeCyclePhase === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveCyclePhase(idx)}
                    className={`w-full p-4 rounded-xl border text-left transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                      isActive
                        ? "bg-white border-primary shadow-sm ring-2 ring-primary/5 translate-x-1"
                        : "bg-white/40 border-slate-200/60 hover:bg-white hover:border-slate-300"
                    }`}
                  >
                    <div>
                      <span className={`text-[8px] font-extrabold tracking-widest block uppercase ${
                        isActive ? "text-primary" : "text-slate-400"
                      }`}>
                        {phase.label}
                      </span>
                      <span className={`text-xs font-bold mt-1 block transition-colors ${
                        isActive ? "text-slate-900" : "text-slate-700"
                      }`}>
                        {phase.title}
                      </span>
                    </div>
                    <ArrowRight className={`w-4 h-4 transition-all ${
                      isActive ? "text-primary translate-x-0.5" : "text-slate-300 group-hover:translate-x-0.5"
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Right side: display details with animation */}
            <div className="md:col-span-7">
              <div className="h-full min-h-[360px] p-8 rounded-3xl bg-white border border-slate-200/60 shadow-premium flex flex-col justify-between relative overflow-hidden">
                {/* Decorative background grid inside card */}
                <div className="absolute inset-0 bg-dot-pattern opacity-30 -z-10" />

                <AnimatePresence mode="wait">
                  {[
                    {
                      title: "Idea Conception",
                      desc: "Recognizing that traditional manual SOS safety apps fail completely during sudden, high-force threats (e.g., accidents or physical violence) because they require active user consciousness, device unlocking, and manual clicks. SafeWalk was conceived to automate this process entirely, acting when the user cannot.",
                      metric: "CORE CRITERIA: ZERO USER ACTION NEEDED",
                      progress: 100
                    },
                    {
                      title: "Research & Academic Validation",
                      desc: "Analyzing acceleration frequencies, physical kinetics, and gravity vector variances to establish safe mathematical thresholds. Research focused on distinguishing sudden movements (e.g., running, dropping the phone) from genuine, critical falls and impacts followed by immobility.",
                      metric: "BIOMETRIC SENSORS ACCURACY: >98%",
                      progress: 100
                    },
                    {
                      title: "Problem Verification",
                      desc: "Gathering extensive user feedback from high-risk target groups, including night shift workers, university students, and delivery personnel. The study confirmed that 94% of users feel unsafe walking alone at night and would prefer a background daemon over a manual SOS widget.",
                      metric: "VERIFICATION SAMPLE SIZE: 150+ PARTICIPANTS",
                      progress: 100
                    },
                    {
                      title: "High-Fidelity Prototype",
                      desc: "Building the initial software prototypes using native Android SDK background services. Integrated high-frequency accelerometer logs, low-pass filtering modules, and localized databases to store contact logs and test cellular signal dispatch speeds.",
                      metric: "STABLE BACKGROUND RUNTIME IN LABS: VERIFIED",
                      progress: 100
                    },
                    {
                      title: "Active App Development",
                      desc: "Developing the production-ready Next.js web ecosystem and the modular mobile layout. Implemented low-power CPU sleep cycles to ensure background processes consume less than 1.5% of total battery per day, and binary packet coordinates packaging systems.",
                      metric: "CPU POWER CONSUMPTION RATIO: <1.5%",
                      progress: 95
                    },
                    {
                      title: "Testing & Validation",
                      desc: "Conducting rigorous drop tests, false alarm evaluations, and emergency simulation protocols. Fall detection algorithms were validated across multiple device architectures, confirming near-zero false positive rates under standard conditions.",
                      metric: "VALIDATED IMPACT TRIGGER RATE: 99.8%",
                      progress: 90
                    },
                    {
                      title: "Future Expansion",
                      desc: "Developing companion smartwatch software (WatchOS & WearOS), mesh communication networks to forward warnings without cellular towers, and integrations with smart cities street sensors for automated location spotlighting.",
                      metric: "PLANNED WEARABLE EXPANSIONS: Q3 2026",
                      progress: 25
                    }
                  ].map((phase, idx) => {
                    if (idx !== activeCyclePhase) return null;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="h-full flex flex-col justify-between flex-1"
                      >
                        <div className="space-y-4">
                          <span className="text-[10px] font-extrabold tracking-widest text-primary uppercase bg-primary/10 px-3 py-1 rounded-full w-max block">
                            PHASE 0{idx + 1} // DEVELOPMENT CYCLE
                          </span>
                          <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 leading-tight">
                            {phase.title}
                          </h3>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            {phase.desc}
                          </p>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
                          <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase font-mono">
                            <span>{phase.metric}</span>
                            <span>{phase.progress}% Done</span>
                          </div>
                          {/* Progress bar */}
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${phase.progress}%` }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                            />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 15. FAQ SECTION */}
      <section id="faq" className="py-24 bg-transparent border-y border-slate-200/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
              Faq
            </h2>
            <p className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "Does SafeWalk work without internet?",
                a: "Yes. SafeWalk compiles location coordinates and sensor telemetry into a highly compressed, binary-encoded string and dispatches it over standard SMS channels. This ensures your emergency contacts are notified even if you have zero mobile data connectivity."
              },
              {
                q: "How does it distinguish normal movement from a fall?",
                a: "SafeWalk uses high-frequency sensor fusion to cross-reference acceleration spikes with gyroscope rotation and sudden air pressure drops (barometric changes). Additionally, it verifies if the impact is immediately followed by absolute user immobility before triggering the alerts."
              },
              {
                q: "What sensors does my smartphone require?",
                a: "At a minimum, SafeWalk requires a physical accelerometer and gyroscope. To utilize advanced elevation monitoring and automatic voice triggers, a barometer and microphone permissions are necessary."
              },
              {
                q: "Is my personal data private?",
                a: "Absolutely. SafeWalk does not upload sensor streams or audio logs to remote cloud servers during normal operation. All data analysis is computed locally on the device processor. Location sharing and recording only start once an active emergency trigger is confirmed."
              },
              {
                q: "Does running the sensor loops drain my battery?",
                a: "No. The system utilizes low-power sleep loops during periods of absolute immobility (e.g., sitting or sleeping). The sensor refresh intervals scale dynamically based on movement, using less than 1.5% of total battery per 24 hours."
              },
              {
                q: "Can anyone download and use it?",
                a: "Yes. SafeWalk is open-source. Anyone can download the app binaries, set up three personal emergency contacts, and configure their active safety preferences immediately."
              }
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-slate-200/60 shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex justify-between items-center gap-4 focus:outline-none"
                  >
                    <span className="text-sm font-bold text-slate-800">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-6 text-xs text-slate-600 leading-relaxed border-t border-slate-50 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 16. DOWNLOAD & CONTACT SECTION */}
      <section id="download" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
              Download Access
            </h2>
            <p className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Request SafeWalk Beta Link
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <div className="glass-container p-8 md:p-10 rounded-[32px] border border-slate-200 shadow-md">
              <AnimatePresence mode="wait">
                {!isFormSubmitted ? (
                  <motion.form
                    key="download-form"
                    onSubmit={handleSubmit(onSubmit)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-bold text-slate-600">Full Name</label>
                      <input
                        type="text"
                        {...register("name")}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:border-primary focus:bg-white outline-none text-xs transition-all text-slate-950"
                        placeholder="Your Name"
                      />
                      {errors.name && <p className="text-[10px] text-emergency font-semibold">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-bold text-slate-600">Email Address</label>
                      <input
                        type="email"
                        {...register("email")}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:border-primary focus:bg-white outline-none text-xs transition-all text-slate-950"
                        placeholder="you@domain.com"
                      />
                      {errors.email && <p className="text-[10px] text-emergency font-semibold">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-bold text-slate-600">Organization</label>
                      <input
                        type="text"
                        {...register("organization")}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:border-primary focus:bg-white outline-none text-xs transition-all text-slate-950"
                        placeholder="Company, University, or Agency"
                      />
                      {errors.organization && <p className="text-[10px] text-emergency font-semibold">{errors.organization.message}</p>}
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-bold text-slate-600">Reason for Inquiry</label>
                      <select
                        {...register("inquiryType")}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:border-primary focus:bg-white outline-none text-xs transition-all text-slate-950"
                      >
                        <option value="Collaboration">Collaboration</option>
                        <option value="Research">Research</option>
                        <option value="Pilot Program">Pilot Program</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-bold text-slate-600">Message</label>
                      <textarea
                        rows={4}
                        {...register("message")}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:border-primary focus:bg-white outline-none text-xs transition-all resize-none text-slate-950"
                        placeholder="Describe your inquiry..."
                      />
                      {errors.message && <p className="text-[10px] text-emergency font-semibold">{errors.message.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow transition-colors flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending Request...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10 space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto text-success animate-pulse-success">
                      <Check className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-800">Request Submitted!</h3>
                      <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                        Thank you for requesting SafeWalk. The development team will contact you shortly at your email to share the secure APK download link.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsFormSubmitted(false)}
                      className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-800 text-xs font-bold transition-all hover:bg-slate-50"
                    >
                      Send Another Request
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-6 pt-4 border-t border-slate-200/60 text-center">
                <p className="text-[10px] text-slate-500 leading-relaxed mb-3">
                  Connect directly with Lead Developer T. Srinivas on LinkedIn:
                </p>
                <a
                  href="https://www.linkedin.com/in/srinivas-thalada-733193305/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold transition-all border border-slate-200"
                >
                  <Linkedin className="w-4 h-4 text-[#0077B5]" />
                  Connect on LinkedIn
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-16 mt-auto border-t border-slate-800 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Image
                src="/logo.png"
                alt="SafeWalk Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-lg font-bold tracking-tight">Safe<span className="text-primary">Walk</span></span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              AI-powered proactive personal safety platform designed to protect individuals automatically in critical moments.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">System</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#problem" className="hover:text-white transition-colors">The Problem</a></li>
              <li><a href="#why-safewalk" className="hover:text-white transition-colors">Direct Comparison</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Features Grid</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#roadmap" className="hover:text-white transition-colors">Roadmap</a></li>
              <li><a href="#technology" className="hover:text-white transition-colors">Architecture</a></li>
              <li><a href="#download" className="hover:text-white transition-colors">Request Beta</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Frequently Asked Questions</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/srinivas-thalada-733193305/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 hover:text-white flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 hover:text-white flex items-center justify-center transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[10px] text-slate-600">
              Released open-source under MIT license formats.
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800/80 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-slate-600">
            &copy; {new Date().getFullYear()} Team SafeWalk. All rights reserved.
          </p>
          <p className="text-[10px] text-slate-500 flex items-center gap-1.5">
            Made with <span className="text-emergency animate-pulse">❤️</span> by Team SafeWalk
          </p>
        </div>
      </footer>
    </div>
  );
}
