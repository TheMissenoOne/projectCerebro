const { LinkedinScraper, events } = require('linkedin-jobs-scraper');
const fs = require('fs');

const KEYWORDS = ['Java', 'React', 'Node.js', 'JavaScript', 'TypeScript', 'AWS', 'Docker', 'Kubernetes', 'Agile', 'Spring Boot', 'Next.js', 'Express', 'MongoDB', 'SQL', 'Full Stack'];

async function run() {
  const scraper = new LinkedinScraper({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  let allJobs = [];
  
  scraper.on(events.error, (error) => {
    console.error('Error:', error);
  });
  
  scraper.on(events.warning, (warning) => {
    console.warn('Warning:', warning);
  });
  
  console.log('Searching: Software Developer in Brazil');
  
  await scraper.run([{
    query: 'Software Developer',
    options: { locations: ['Brazil'], limit: 25 }
  }], {}, (job) => {
    console.log(`Found: ${job.title} at ${job.company}`);
    allJobs.push({
      title: job.title,
      company: job.company,
      location: job.location,
      date: job.date,
      description: job.description,
      link: job.link,
      query: 'Software Developer'
    });
  });
  
  console.log(`Total jobs found: ${allJobs.length}`);
  
  // Analyze jobs against resume
  const analyzedJobs = allJobs.map(job => {
    const descLower = (job.description || '').toLowerCase();
    const matchedSkills = KEYWORDS.filter(skill => descLower.includes(skill.toLowerCase()));
    
    return {
      ...job,
      matchedSkills,
      matchCount: matchedSkills.length
    };
  });
  
  // Sort by match count
  analyzedJobs.sort((a, b) => b.matchCount - a.matchCount);
  
  // Save to JSON
  const output = {
    scrapedAt: new Date().toISOString(),
    totalJobsFound: allJobs.length,
    jobs: analyzedJobs
  };
  
  fs.writeFileSync('jobs-report.json', JSON.stringify(output, null, 2));
  console.log('Saved jobs-report.json');
}

run().catch(console.error);
