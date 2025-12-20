import React from 'react';
import SEO from '../components/SEO';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
  icon: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: "What 3D Printer do you typically use the most?",
    answer: (
      <>
        My primary workhorse is a <strong className="text-white">Bambu Lab H2D</strong>. It is equipped with <strong className="text-accent-500">dual AMS Units</strong>, allowing for seamless 8-color multi-material printing and automatic filament failover for long technical builds.
      </>
    ),
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    )
  },
  {
    question: "What software do you use for your designs?",
    answer: (
      <>
        I utilize a variety of tools depending on the complexity of the project. This includes <strong className="text-white">Shapr3D</strong> for intuitive modeling, <strong className="text-white">Fusion 360</strong> for precise engineering, <strong className="text-white">Bambu Studio</strong> for slicing and print preparation, and even <strong className="text-white">TinkerCAD</strong> for quick geometric adjustments!
      </>
    ),
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  {
    question: "Can I request a custom color or material?",
    answer: (
      <>
        Absolutely. While I stock the <strong className="text-white">Most Common</strong> materials like PLA and PETG, I can order specialty engineering filaments (like Carbon Fiber Nylon or TPU) for specific functional requirements. Check my <a href="/#/materials" className="text-accent-500 hover:underline">Materials Guide</a> for performance comparisons.
      </>
    ),
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    )
  },
  {
    question: "Do you offer shipping or local pickup?",
    answer: (
      <>
        I am based in <strong className="text-white">Leonardtown, MD</strong>. I offer local pickup for neighbors, however, for shipping inquiries please send me an email with your project details and I can provide a quote.
      </>
    ),
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  }
];

const FAQs: React.FC = () => {
  return (
    <div className="space-y-16 max-w-4xl mx-auto">
      <SEO 
        title="FAQ's | Brandon Prints" 
        description="Frequently asked questions about Brandon's 3D printing equipment, software, and custom project process."
      />

      {/* Header */}
      <section className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">FAQ's</h1>
        <p className="text-xl text-slate-400 leading-relaxed border-l-4 border-accent-500 pl-6">
            Everything you need to know about the tools and processes behind the prints.
        </p>
      </section>

      {/* FAQ Grid */}
      <div className="grid grid-cols-1 gap-6">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="group bg-maker-900/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 hover:border-accent-500/30 transition-all duration-300"
          >
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center text-accent-500 group-hover:scale-110 transition-transform">
                {faq.icon}
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white group-hover:text-accent-500 transition-colors">
                  {faq.question}
                </h3>
                <p className="text-slate-400 leading-relaxed font-medium">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-br from-maker-900 to-maker-800 p-10 rounded-3xl border border-white/5 text-center space-y-6">
        <h3 className="text-2xl font-bold text-white">Still have a question?</h3>
        <p className="text-slate-400 max-w-xl mx-auto">
            If your question isn't covered here, feel free to reach out directly. I'm always happy to discuss new projects or technical constraints.
        </p>
        <div className="pt-4">
            <a 
                href="mailto:bmcurrie15@gmail.com?subject=FAQ%20Inquiry" 
                className="inline-flex items-center gap-2 px-8 py-3 bg-accent-500 text-white font-bold rounded-xl hover:bg-accent-600 transition-all shadow-lg shadow-accent-500/20 active:scale-95"
            >
                Contact Me
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </a>
        </div>
      </div>
    </div>
  );
};

export default FAQs;