const { LinkedinScraper, events, relevanceFilter, timeFilter, typeFilter, experienceLevelFilter } = require('linkedin-jobs-scraper');
const fs = require('fs');

const queries = [
  {
    query: 'Software Developer',
    location: 'São Paulo, Brazil',
    options: {
      relevanceFilter: relevanceFilter.RELEVANT,
      timeFilter: timeFilter.MONTH,
      typeFilter: typeFilter.FULL_TIME,
      experienceLevelFilter: [experienceLevelFilter.MID_SENIOR, experienceLevelFilter.ASSOCIATE]
    }
  },
  {
    query: 'Full Stack Developer',
    location: 'São Paulo, Brazil',
    options: {
      relevanceFilter: relevanceFilter.RELEVANT,
      timeFilter: timeFilter.MONTH,
      typeFilter: typeFilter.FULL_TIME,
      experienceLevelFilter: [experienceLevelFilter.MID_SENIOR, experienceLevelFilter.ASSOCIATE]
    }
  },
  {
    query: 'React Developer',
    location: 'São Paulo, Brazil',
    options: {
      relevanceFilter: relevanceFilter.RELEVANT,
      timeFilter: timeFilter.MONTH,
      typeFilter: typeFilter.FULL_TIME,
      experienceLevelFilter: [experienceLevelFilter.MID_SENIOR, experienceLevelFilter.ASSOCIATE]
    }
  },
  {
    query: 'Java Developer',
    location: 'São Paulo, Brazil',
    options: {
      relevanceFilter: relevanceFilter.RELEVANT,
      timeFilter: timeFilter.MONTH,
      typeFilter: typeFilter.FULL_TIME,
      experienceLevelFilter: [experienceLevelFilter.MID_SENIOR, experienceLevelFilter.ASSOCIATE]
    }
  },
  {
    query: 'Frontend Developer',
    location: 'São Paulo, Brazil',
    options: {
      relevanceFilter: relevanceFilter.RELEVANT,
      timeFilter: timeFilter.MONTH,
      typeFilter: typeFilter.FULL_TIME,
      experienceLevelFilter: [experienceLevelFilter.MID_SENIOR, experienceLevelFilter.ASSOCIATE]
    }
  },
  {
    query: 'Software Engineer',
    location: 'São Paulo, Brazil',
    options: {
      relevanceFilter: relevanceFilter.RELEVANT,
      timeFilter: timeFilter.MONTH,
      typeFilter: typeFilter.FULL_TIME,
      experienceLevelFilter: [experienceLevelFilter.MID_SENIOR, experienceLevelFilter.ASSOCIATE]
    }
  }
];

const KEYWORDS = ['Java', 'React', 'Node.js', 'JavaScript', 'TypeScript', 'AWS', 'Docker', 'Kubernetes', 'Agile', 'Spring Boot', 'Next.js', 'Express', 'MongoDB', 'SQL', 'Full Stack'];

async function run() {
  const scraper = new LinkedinScraper();
  
  let allJobs = [];
  
  scraper.on(events.error, (error) => {
    console.error('Error:', error);
  });
  
  scraper.on(events.warning, (warning) => {
    console.warn('Warning:', warning);
  });
  
  for (const q of queries) {
    console.log(`Searching: ${q.query} in ${q.location}`);
    
    const jobList = [];
    
    await scraper.run(q.query, q.location, q.options, (job) => {
      jobList.push({
        title: job.title,
        company: job.company,
        location: job.location,
        date: job.date,
        description: job.description,
        link: job.link,
        query: q.query
      });
    }, { 
      timeout: 60000,
      waitForElement: 'div.base-search-card__info'
    });
    
    console.log(`Found ${jobList.length} jobs for "${q.query}"`);
    allJobs.push(...jobList);
  }
  
  // Remove duplicates by link
  const uniqueJobs = Array.from(new Map(allJobs.map(j => [j.link, j])).values());
  
  console.log(`\nTotal unique jobs: ${uniqueJobs.length}`);
  
  // Analyze jobs against resume
  const analyzedJobs = uniqueJobs.map(job => {
    const descLower = job.description.toLowerCase();
    const matchedSkills = KEYWORDS.filter(skill => descLower.includes(skill.toLowerCase()));
    
    return {
      ...job,
      matchedSkills,
      matchCount: matchedSkills.length,
      matchPercentage: Math.round((matchedSkills.length / KEYWORDS.length) * 100)
    };
  });
  
  // Sort by match count
  analyzedJobs.sort((a, b) => b.matchCount - a.matchCount);
  
  // Save to JSON
  const output = {
    scrapedAt: new Date().toISOString(),
    totalJobsFound: uniqueJobs.length,
    userProfile: {
      name: 'Vítor Misseno Feliciano da Silva',
      title: 'Software Developer',
      skills: ['Java', 'React', 'Node.js', 'JavaScript', 'TypeScript', 'AWS', 'Docker', 'Kubernetes', 'Agile', 'Spring Boot', 'Next.js', 'Express', 'MongoDB', 'SQL', 'Full Stack'],
      experience: '5+ years',
      location: 'São Paulo, SP'
    },
    jobs: analyzedJobs
  };
  
  fs.writeFileSync('jobs-report.json', JSON.stringify(output, null, 2));
  console.log('\nSaved jobs-report.json');
  
  // Print top 10 matches
  console.log('\n=== TOP 10 MATCHES ===\n');
  analyzedJobs.slice(0, 10).forEach((job, i) => {
    console.log(`${i + 1}. ${job.title} @ ${job.company}`);
    console.log(`   Skills: ${job.matchedSkills.join(', ')} (${job.matchCount} matches)`);
    console.log(`   Link: ${job.link}\n`);
  });
}

run().catch(console.error);
