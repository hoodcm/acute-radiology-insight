
export interface Post {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  date: string;
  authorId: number;
  content: string;
}

export const posts: Post[] = [
  // Essays
  {
    id: 1,
    slug: 'ct-protocol-optimization',
    title: 'CT Protocol Optimization in the ED',
    description: 'A deep dive into optimizing computed tomography protocols for common emergency department presentations.',
    category: 'Essay',
    tags: ['CT', 'Trauma', 'Best Practices'],
    date: 'June 10, 2025',
    authorId: 1,
    content: `<p>Optimizing CT protocols is a critical task for any modern emergency department. It's a delicate balance between diagnostic yield, radiation dose, and workflow efficiency. In this essay, we will explore several key areas for improvement.</p><h3>Contrast Administration</h3><p>The timing and volume of intravenous contrast are paramount. We've found that weight-based dosing, coupled with bolus tracking, significantly improves the consistency of arterial and venous phase imaging, particularly in polytrauma patients.</p><h3>Low-Dose Techniques</h3><p>Iterative reconstruction algorithms have been a game-changer, allowing for substantial dose reduction without a significant loss in image quality. We'll discuss our institution's experience implementing ASiR-V on our scanners.</p>`,
  },
  {
    id: 2,
    slug: 'radiation-dose-management',
    title: 'Radiation Dose Management: ALARA in Practice',
    description: 'Practical strategies for implementing ALARA principles in emergency radiology without compromising diagnostic accuracy.',
    category: 'Essay',
    tags: ['Radiation Safety', 'ALARA', 'Quality'],
    date: 'June 8, 2025',
    authorId: 1,
    content: `<p>The ALARA principle (As Low As Reasonably Achievable) isn't just a regulatory requirement—it's our ethical responsibility to patients. This essay explores practical implementation strategies that maintain diagnostic quality while minimizing radiation exposure.</p><h3>Technical Considerations</h3><p>Modern CT scanners offer numerous dose reduction technologies, from automatic exposure control to iterative reconstruction algorithms. Understanding when and how to use these tools is crucial for optimal patient care.</p><h3>Clinical Decision Making</h3><p>Not every chest pain requires a CT angiogram. We'll discuss evidence-based decision trees that help clinicians choose the most appropriate imaging modality for each clinical scenario.</p>`,
  },
  {
    id: 3,
    slug: 'future-of-emergency-radiology',
    title: 'The Future of Emergency Radiology: AI and Beyond',
    description: 'Exploring how artificial intelligence and emerging technologies are reshaping emergency imaging workflows.',
    category: 'Essay',
    tags: ['AI', 'Future Tech', 'Workflow'],
    date: 'June 5, 2025',
    authorId: 3,
    content: `<p>Emergency radiology is on the cusp of a technological revolution. From AI-powered triage systems to automated protocol selection, the next decade promises dramatic changes in how we practice.</p><h3>Current AI Applications</h3><p>Today's AI tools excel at pattern recognition tasks—detecting pneumothorax, identifying large vessel occlusions, and flagging critical findings for urgent review. But this is just the beginning.</p><h3>The Road Ahead</h3><p>Future developments in natural language processing, automated reporting, and predictive analytics will fundamentally change the radiologist's role from image interpreter to clinical decision support specialist.</p>`,
  },
  
  // Hindsight
  {
    id: 4,
    slug: 'unseen-aortic-dissection',
    title: 'Hindsight: The Unseen Aortic Dissection',
    description: 'An analysis of a missed case of aortic dissection and the cognitive biases that played a role.',
    category: 'Hindsight',
    tags: ['Error Analysis', 'Aorta', 'Hindsight'],
    date: 'May 28, 2025',
    authorId: 2,
    content: `<p>Root cause analysis of diagnostic errors is crucial for improving patient safety. This case involves a 45-year-old male presenting with chest pain, whose initial chest CT was interpreted as negative for acute aortic pathology.</p><h3>Initial Presentation</h3><p>The patient's initial complaint was atypical, described as a sharp, intermittent pain radiating to the back. The initial read focused on ruling out pulmonary embolism, a classic example of "search satisficing" where the search is terminated after finding the first abnormality (or lack thereof).</p><h3>The Miss</h3><p>A subtle intimal flap in the ascending aorta was missed on the initial review. We will review the images and discuss the perceptual and cognitive factors that contributed to this oversight, including availability bias, and premature closure.</p>`,
  },
  {
    id: 5,
    slug: 'anchoring-bias-pediatric-case',
    title: 'When Anchoring Bias Nearly Cost a Child',
    description: 'A pediatric case demonstrating how initial impressions can lead us astray in emergency imaging.',
    category: 'Hindsight',
    tags: ['Error Analysis', 'Pediatric', 'Cognitive Bias'],
    date: 'May 25, 2025',
    authorId: 2,
    content: `<p>A 7-year-old presented to the ED with abdominal pain. The clinical team suspected appendicitis, and this assumption colored every subsequent decision—including the radiological interpretation.</p><h3>The Clinical Story</h3><p>Right lower quadrant pain, low-grade fever, elevated white count. Classic appendicitis, right? The CT was ordered specifically to "rule out appendicitis," and that's exactly what I was looking for.</p><h3>What We Missed</h3><p>While focusing on the appendix (which was normal), I nearly missed the real culprit: a small bowel intussusception. This case perfectly illustrates how anchoring bias can narrow our search pattern and lead to diagnostic errors.</p>`,
  },
  {
    id: 6,
    slug: 'satisfaction-of-search-trauma',
    title: 'Satisfaction of Search in Polytrauma',
    description: 'How finding one obvious injury can blind us to other critical findings in trauma patients.',
    category: 'Hindsight',
    tags: ['Error Analysis', 'Trauma', 'Polytrauma'],
    date: 'May 22, 2025',
    authorId: 2,
    content: `<p>Polytrauma patients present unique challenges for radiologists. The tendency to stop searching after finding an obvious injury—known as "satisfaction of search"—can lead to missed injuries with serious consequences.</p><h3>The Case</h3><p>A motorcycle accident victim with an obvious femur fracture. After identifying this injury on the trauma pan-scan, the radiologist's attention was immediately drawn to the orthopedic injury, leading to a delayed diagnosis of a small pneumothorax.</p><h3>Lessons Learned</h3><p>Systematic search patterns and checklists can help combat this cognitive bias. We'll discuss practical strategies for maintaining thoroughness even when obvious pathology is present.</p>`,
  },

  // Case Studies
  {
    id: 7,
    slug: 'acute-appendicitis-case',
    title: 'Case Study: Acute Appendicitis',
    description: 'A classic case of acute appendicitis on CT, with key imaging findings and differential diagnoses.',
    category: 'Case Study',
    tags: ['Abdomen', 'CT', 'Case Study'],
    date: 'June 01, 2025',
    authorId: 2,
    content: `<p>This is a classic case study of acute appendicitis. We will review the CT findings and discuss the clinical presentation and management.</p><h3>Imaging Findings</h3><p>The appendix is dilated, with wall thickening and surrounding fat stranding. An appendicolith is also present.</p>`,
  },
  {
    id: 8,
    slug: 'pulmonary-embolism-diagnosis',
    title: 'Case Study: Massive Pulmonary Embolism',
    description: 'A critically ill patient with massive PE - imaging findings, pitfalls, and management considerations.',
    category: 'Case Study',
    tags: ['Chest', 'PE', 'Critical'],
    date: 'May 30, 2025',
    authorId: 1,
    content: `<p>A 65-year-old female presents with acute dyspnea and hypotension. CTPA reveals extensive bilateral pulmonary emboli with evidence of right heart strain.</p><h3>Key Imaging Findings</h3><p>Bilateral main pulmonary artery filling defects, enlarged right ventricle with interventricular septal flattening, and peripheral consolidations consistent with pulmonary infarcts.</p><h3>Management Implications</h3><p>This case demonstrates the importance of rapid recognition and communication of massive PE findings to guide emergent intervention decisions.</p>`,
  },
  {
    id: 9,
    slug: 'pediatric-intussusception',
    title: 'Case Study: Pediatric Intussusception',
    description: 'A 2-year-old with classic intussusception findings on ultrasound and CT.',
    category: 'Case Study',
    tags: ['Pediatric', 'Ultrasound', 'Abdomen'],
    date: 'May 27, 2025',
    authorId: 3,
    content: `<p>A 2-year-old male presents with colicky abdominal pain and vomiting. Ultrasound reveals the classic "target sign" of intussusception in the right lower quadrant.</p><h3>Ultrasound Findings</h3><p>The "donut sign" on transverse imaging and "sandwich sign" on longitudinal views are pathognomonic for intussusception. Color Doppler shows decreased vascularity within the intussuscepted segment.</p><h3>Treatment and Follow-up</h3><p>Successful pneumatic reduction was performed under fluoroscopic guidance, avoiding the need for surgical intervention.</p>`,
  },
  {
    id: 10,
    slug: 'stroke-imaging-protocol',
    title: 'Case Study: Acute Stroke Imaging Protocol',
    description: 'Step-by-step imaging approach for suspected acute stroke with large vessel occlusion.',
    category: 'Case Study',
    tags: ['Neuro', 'Stroke', 'CTA'],
    date: 'May 24, 2025',
    authorId: 3,
    content: `<p>A 72-year-old male presents with acute left-sided weakness and aphasia. Imaging reveals an acute M1 occlusion with salvageable tissue on perfusion studies.</p><h3>Imaging Protocol</h3><p>Non-contrast CT rules out hemorrhage, CTA identifies the occlusion site, and CT perfusion maps the ischemic penumbra to guide intervention decisions.</p><h3>Time-Critical Interpretation</h3><p>This case emphasizes the importance of rapid, accurate interpretation in acute stroke care where "time is brain."</p>`,
  },

  // Tools
  {
    id: 11,
    slug: 'ai-in-stroke-imaging',
    title: 'The Role of AI in Acute Stroke Imaging',
    description: 'Evaluating new AI-powered tools for large vessel occlusion detection and ASPECTS scoring.',
    category: 'Tool',
    tags: ['AI', 'Neuro', 'Tools'],
    date: 'May 15, 2025',
    authorId: 3,
    content: `<p>Artificial intelligence is rapidly changing the landscape of neuroradiology, especially in the context of acute stroke. This post reviews three commercially available AI platforms for stroke imaging analysis.</p><h3>Large Vessel Occlusion (LVO) Detection</h3><p>We compared the sensitivity and specificity of AI-driven LVO alerts against the final interpretations of our neuroradiology faculty. The results are promising, with AI demonstrating high sensitivity for M1 and ICA terminus occlusions.</p><h3>Automated ASPECTS Scoring</h3><p>ASPECTS scoring can be subjective. AI tools provide a consistent, reproducible score, but do they agree with expert readers? We explore the nuances and potential pitfalls of relying on automated scoring systems.</p>`,
  },
  {
    id: 12,
    slug: 'hanging-protocol-optimization',
    title: 'Hanging Protocol Optimization for Emergency CT',
    description: 'Best practices for configuring PACS hanging protocols to improve reading efficiency in emergency radiology.',
    category: 'Tool',
    tags: ['PACS', 'Workflow', 'Efficiency'],
    date: 'May 12, 2025',
    authorId: 1,
    content: `<p>Efficient hanging protocols can dramatically improve reading speed and accuracy in emergency radiology. This guide provides evidence-based recommendations for optimizing your PACS setup.</p><h3>Multi-Monitor Setup</h3><p>The optimal configuration for emergency CT interpretation includes dedicated monitors for axial images, coronal/sagittal reformats, and prior studies for comparison.</p><h3>Trauma-Specific Protocols</h3><p>Trauma pan-scans require specialized hanging protocols that allow rapid survey of multiple body regions while maintaining detail for focused evaluation of identified abnormalities.</p>`,
  },
  {
    id: 13,
    slug: 'critical-results-communication',
    title: 'Critical Results Communication Tools',
    description: 'Technology solutions for ensuring rapid and reliable communication of critical findings.',
    category: 'Tool',
    tags: ['Communication', 'Critical Results', 'Technology'],
    date: 'May 9, 2025',
    authorId: 2,
    content: `<p>Timely communication of critical results can be the difference between life and death. This review examines various technology solutions for improving critical results communication.</p><h3>Automated Alert Systems</h3><p>Modern PACS systems can automatically flag and route critical findings to appropriate clinical teams, reducing communication delays and ensuring nothing falls through the cracks.</p><h3>Mobile Communication Platforms</h3><p>Secure messaging platforms designed for healthcare enable real-time communication of critical findings with read receipts and escalation protocols.</p>`,
  },
  {
    id: 14,
    slug: 'radiation-dose-tracking',
    title: 'Radiation Dose Tracking and Analytics',
    description: 'Tools and strategies for monitoring and optimizing radiation dose across your imaging department.',
    category: 'Tool',
    tags: ['Radiation Safety', 'Analytics', 'Quality'],
    date: 'May 6, 2025',
    authorId: 1,
    content: `<p>Comprehensive dose tracking is essential for maintaining ALARA principles and regulatory compliance. This review covers the latest tools for dose monitoring and optimization.</p><h3>Dose Management Platforms</h3><p>Enterprise dose management systems provide real-time monitoring, trending analysis, and automated alerts for dose outliers across all imaging modalities.</p><h3>Protocol Optimization</h3><p>Data-driven protocol optimization uses historical dose and image quality metrics to identify opportunities for dose reduction without compromising diagnostic accuracy.</p>`,
  }
];
