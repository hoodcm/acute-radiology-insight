
// Client-side content system - no server dependencies
export interface PostFrontMatter {
  title: string;
  description: string;
  category: string;
  tags: string[];
  date: string;
  authorId: number;
  readTime?: string;
  thumbnailUrl?: string;
  micrographics?: {
    topLeft: string;
    topRight: string;
    bottomLeft: string;
  };
}

export interface ProcessedPost extends PostFrontMatter {
  id: string;
  slug: string;
  content: string;
  outline: string[];
}

// Mock content for now - in a real implementation, this would fetch from an API or static files
const mockPosts: ProcessedPost[] = [
  {
    id: "radiation-dose-management",
    slug: "radiation-dose-management",
    title: "Radiation Dose Management: ALARA in Practice",
    description: "Practical strategies for implementing ALARA principles in emergency radiology without compromising diagnostic accuracy.",
    category: "Essay",
    tags: ["Radiation Safety", "ALARA", "Quality"],
    date: "June 8, 2025",
    authorId: 1,
    readTime: "6 min",
    content: `<h1>Radiation Dose Management: ALARA in Practice</h1>
<p>The ALARA principle (As Low As Reasonably Achievable) isn't just a regulatory requirement—it's our ethical responsibility to patients. This essay explores practical implementation strategies that maintain diagnostic quality while minimizing radiation exposure.</p>
<h2>Technical Considerations</h2>
<p>Modern CT scanners offer numerous dose reduction technologies, from automatic exposure control to iterative reconstruction algorithms. Understanding when and how to use these tools is crucial for optimal patient care.</p>
<h3>Dose Reduction Technologies</h3>
<ul>
<li><strong>Automatic exposure control (AEC)</strong>: Adjusts tube current based on patient size</li>
<li><strong>Iterative reconstruction</strong>: Reduces noise, allowing for lower dose acquisitions</li>
<li><strong>Organ-based dose modulation</strong>: Protects radiosensitive organs</li>
</ul>
<h2>Clinical Decision Making</h2>
<p>Not every chest pain requires a CT angiogram. We'll discuss evidence-based decision trees that help clinicians choose the most appropriate imaging modality for each clinical scenario.</p>
<h3>Decision Support Tools</h3>
<ol>
<li><strong>Clinical decision rules</strong>: Ottawa ankle rules, PERC criteria</li>
<li><strong>AI-powered triage</strong>: Automated protocol selection</li>
<li><strong>Dose tracking systems</strong>: Real-time monitoring and alerts</li>
</ol>
<h2>Quality Assurance</h2>
<p>Implementing a comprehensive dose management program requires:</p>
<ul>
<li>Regular calibration of dose monitoring systems</li>
<li>Periodic review of dose reference levels</li>
<li>Staff education on dose optimization techniques</li>
<li>Patient communication about radiation risks and benefits</li>
</ul>
<h2>Conclusion</h2>
<p>Effective radiation dose management requires a systematic approach that balances clinical needs with safety considerations. The goal is not simply to minimize dose, but to optimize it for each clinical scenario.</p>`,
    outline: ["Technical Considerations", "Clinical Decision Making", "Quality Assurance", "Conclusion"],
    micrographics: {
      topLeft: "",
      topRight: "",
      bottomLeft: "",
    },
  },
  {
    id: "ct-protocol-optimization",
    slug: "ct-protocol-optimization",
    title: "CT Protocol Optimization in the ED",
    description: "A deep dive into optimizing computed tomography protocols for common emergency department presentations.",
    category: "Essay",
    tags: ["CT", "Trauma", "Best Practices"],
    date: "June 10, 2025",
    authorId: 1,
    readTime: "8 min",
    content: `<h1>CT Protocol Optimization in the ED</h1>
<p>Optimizing CT protocols is a critical task for any modern emergency department. It's a delicate balance between diagnostic yield, radiation dose, and workflow efficiency. In this essay, we will explore several key areas for improvement.</p>
<h2>Contrast Administration</h2>
<p>The timing and volume of intravenous contrast are paramount. We've found that weight-based dosing, coupled with bolus tracking, significantly improves the consistency of arterial and venous phase imaging, particularly in polytrauma patients.</p>
<h3>Key Considerations</h3>
<ul>
<li><strong>Weight-based dosing</strong>: 1.5 mL/kg for most applications</li>
<li><strong>Flow rate optimization</strong>: 4-5 mL/s for CTA studies</li>
<li><strong>Bolus tracking</strong>: Essential for consistent enhancement</li>
</ul>
<h2>Low-Dose Techniques</h2>
<p>Iterative reconstruction algorithms have been a game-changer, allowing for substantial dose reduction without a significant loss in image quality. We'll discuss our institution's experience implementing ASiR-V on our scanners.</p>
<h3>Implementation Strategies</h3>
<ol>
<li><strong>Protocol standardization</strong>: Consistent parameters across all scanners</li>
<li><strong>Staff training</strong>: Ensuring technologists understand the new workflows</li>
<li><strong>Quality assurance</strong>: Regular monitoring of image quality metrics</li>
</ol>
<h2>Clinical Integration</h2>
<p>The most sophisticated protocol is useless if it doesn't integrate well with clinical workflows. We've focused on:</p>
<ul>
<li>Reducing scan times to improve patient throughput</li>
<li>Standardizing contrast protocols to reduce errors</li>
<li>Implementing decision support tools for protocol selection</li>
</ul>
<h2>Conclusion</h2>
<p>CT protocol optimization is an ongoing process that requires collaboration between radiologists, technologists, and clinicians. The key is finding the right balance between image quality, radiation safety, and clinical efficiency.</p>`,
    outline: ["Contrast Administration", "Low-Dose Techniques", "Clinical Integration", "Conclusion"],
    micrographics: {
      topLeft: "",
      topRight: "",
      bottomLeft: "",
    },
  },
  {
    id: "acute-appendicitis-case",
    slug: "acute-appendicitis-case",
    title: "Case Study: Acute Appendicitis",
    description: "A classic case of acute appendicitis on CT, with key imaging findings and differential diagnoses.",
    category: "Case Study",
    tags: ["Abdomen", "CT", "Case Study"],
    date: "June 1, 2025",
    authorId: 2,
    readTime: "5 min",
    content: `<h1>Case Study: Acute Appendicitis</h1>
<h2>Clinical Presentation</h2>
<p>A 28-year-old male presents to the emergency department with a 12-hour history of periumbilical pain that has migrated to the right lower quadrant. He reports nausea, vomiting, and low-grade fever.</p>
<h3>Vital Signs</h3>
<ul>
<li>Temperature: 100.8°F (38.2°C)</li>
<li>Heart rate: 95 bpm</li>
<li>Blood pressure: 125/78 mmHg</li>
<li>White blood cell count: 14,500/μL</li>
</ul>
<h2>Imaging Findings</h2>
<p>CT abdomen and pelvis with IV contrast demonstrates:</p>
<h3>Primary Findings</h3>
<ul>
<li><strong>Appendiceal wall thickening</strong>: Measuring 8mm (normal &lt;3mm)</li>
<li><strong>Periappendiceal fat stranding</strong>: Moderate inflammatory changes</li>
<li><strong>Appendicolith</strong>: 5mm calcified deposit within the appendiceal lumen</li>
<li><strong>Fluid collection</strong>: Small amount of free fluid in the pelvis</li>
</ul>
<h3>Additional Observations</h3>
<ul>
<li>No evidence of perforation or abscess formation</li>
<li>Normal appearance of adjacent bowel loops</li>
<li>No alternative explanation for symptoms</li>
</ul>
<h2>Differential Diagnosis</h2>
<p>While the imaging findings are classic for acute appendicitis, other conditions to consider include:</p>
<ol>
<li><strong>Crohn's disease</strong>: Terminal ileitis</li>
<li><strong>Infectious colitis</strong>: Right-sided involvement</li>
<li><strong>Ovarian pathology</strong>: In female patients</li>
<li><strong>Urinary tract infection</strong>: Particularly in elderly patients</li>
</ol>
<h2>Management</h2>
<p>The patient was taken to surgery for laparoscopic appendectomy. Pathology confirmed acute appendicitis with transmural inflammation.</p>
<h2>Key Learning Points</h2>
<ul>
<li>Appendicoliths are present in approximately 25% of cases</li>
<li>Wall thickening &gt;3mm is a reliable sign of appendicitis</li>
<li>Periappendiceal fat stranding indicates inflammatory response</li>
<li>CT has a sensitivity of 95% and specificity of 99% for appendicitis</li>
</ul>
<h2>Conclusion</h2>
<p>This case demonstrates the classic CT findings of acute appendicitis. Early recognition and appropriate surgical management lead to excellent outcomes with minimal complications.</p>`,
    outline: ["Clinical Presentation", "Imaging Findings", "Differential Diagnosis", "Management", "Key Learning Points", "Conclusion"],
    micrographics: {
      topLeft: "",
      topRight: "",
      bottomLeft: "",
    },
  }
];

export async function getPostBySlug(slug: string): Promise<ProcessedPost | null> {
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockPosts.find(post => post.slug === slug) || null;
}

export async function getAllPosts(): Promise<ProcessedPost[]> {
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 100));
  return [...mockPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostsByCategory(category: string): Promise<ProcessedPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.category === category);
}

export function generatePostId(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    const char = slug.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}
