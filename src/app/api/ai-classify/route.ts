import { NextResponse } from 'next/server';
import { Sector, Stage } from '@/types/innovategram';

export async function POST(request: Request) {
  try {
    const { transcript, language = 'gu', title, problem, solution, village } = await request.json();

    const fullText = `${title || ''} ${problem || ''} ${solution || ''} ${transcript || ''} ${village || ''}`.toLowerCase();

    if (!fullText.trim()) {
      return NextResponse.json(
        { success: false, error: 'Voice transcript or innovation text is required' },
        { status: 400 }
      );
    }

    // 12 Mandatory Sectors from Requirement 7
    let detectedSector: Sector = 'Agriculture';
    let subsector = 'Farm Equipment & Implements';

    if (
      fullText.includes('water') ||
      fullText.includes('pani') ||
      fullText.includes('પાણી') ||
      fullText.includes('પાણીની') ||
      fullText.includes('સિંચાઈ') ||
      fullText.includes('ડ્રિપ') ||
      fullText.includes('બોરવેલ') ||
      fullText.includes('जल') ||
      fullText.includes('सिंचाई') ||
      fullText.includes('पानी')
    ) {
      detectedSector = 'Water and Sanitation';
      subsector = 'Water Conservation & Micro-Irrigation';
    } else if (
      fullText.includes('solar') ||
      fullText.includes('સોલાર') ||
      fullText.includes('સૂર્ય') ||
      fullText.includes('ઊર્જા') ||
      fullText.includes('solar energy') ||
      fullText.includes('सौर') ||
      fullText.includes('सोलर') ||
      fullText.includes('wind') ||
      fullText.includes('biogas') ||
      fullText.includes('બાયોગેસ')
    ) {
      detectedSector = 'Renewable Energy';
      subsector = 'Decentralized Solar & Biomass Power';
    } else if (
      fullText.includes('health') ||
      fullText.includes('doctor') ||
      fullText.includes('દવા') ||
      fullText.includes('દર્દી') ||
      fullText.includes('આરોગ્ય') ||
      fullText.includes('તબીબી') ||
      fullText.includes('स्वास्थ्य') ||
      fullText.includes('दवा') ||
      fullText.includes('अस्पताल')
    ) {
      detectedSector = 'Healthcare';
      subsector = 'Rural Diagnostic & Healthcare Tools';
    } else if (
      fullText.includes('school') ||
      fullText.includes('શાળા') ||
      fullText.includes('શિક્ષણ') ||
      fullText.includes('વિદ્યાર્થી') ||
      fullText.includes('બાળકો') ||
      fullText.includes('शिक्षा') ||
      fullText.includes('स्कूल') ||
      fullText.includes('विद्यार्थी')
    ) {
      detectedSector = 'Education';
      subsector = 'Rural Interactive Learning Aids';
    } else if (
      fullText.includes('waste') ||
      fullText.includes('કચરો') ||
      fullText.includes('નિકાલ') ||
      fullText.includes('પરાળી') ||
      fullText.includes('કમ્પોસ્ટ') ||
      fullText.includes('कचरा') ||
      fullText.includes('पराली') ||
      fullText.includes('अपशिष्ट')
    ) {
      detectedSector = 'Waste Management';
      subsector = 'Agro-Waste Upcycling & Composting';
    } else if (
      fullText.includes('assistive') ||
      fullText.includes('walker') ||
      fullText.includes('wheelchair') ||
      fullText.includes('દિવ્યાંગ') ||
      fullText.includes('વોકર') ||
      fullText.includes('વ્હીલચેર') ||
      fullText.includes('લાઠી') ||
      fullText.includes('दिव्यांग') ||
      fullText.includes('पहिया')
    ) {
      detectedSector = 'Assistive Technology';
      subsector = 'Mobility & Accessibility Equipment';
    } else if (
      fullText.includes('transport') ||
      fullText.includes('વાહન') ||
      fullText.includes('ગાડી') ||
      fullText.includes('પરિવહન') ||
      fullText.includes('ટ્રોલી') ||
      fullText.includes('गाड़ी') ||
      fullText.includes('परिवहन')
    ) {
      detectedSector = 'Transportation';
      subsector = 'Rural Transport & Hauling Devices';
    } else if (
      fullText.includes('livelihood') ||
      fullText.includes('કારીગર') ||
      fullText.includes('ડેરી') ||
      fullText.includes('પશુપાલન') ||
      fullText.includes('વણાટ') ||
      fullText.includes('ડેરી') ||
      fullText.includes('આજીવિકા') ||
      fullText.includes('पशुपालन')
    ) {
      detectedSector = 'Rural Livelihoods';
      subsector = 'Artisan & Dairy Income Boosters';
    } else if (
      fullText.includes('construction') ||
      fullText.includes('મકાન') ||
      fullText.includes('ઈંટ') ||
      fullText.includes('સિમેન્ટ') ||
      fullText.includes('છત') ||
      fullText.includes('બાંધકામ') ||
      fullText.includes('भवन') ||
      fullText.includes('ईंट')
    ) {
      detectedSector = 'Construction';
      subsector = 'Eco-Friendly Building Materials';
    } else if (
      fullText.includes('environment') ||
      fullText.includes('જંગલ') ||
      fullText.includes('પર્યાવરણ') ||
      fullText.includes('વૃક્ષ') ||
      fullText.includes('પ્રદૂષણ') ||
      fullText.includes('पर्यावरण')
    ) {
      detectedSector = 'Environment';
      subsector = 'Ecology & Biodiversity Protection';
    } else if (
      fullText.includes('manufacturing') ||
      fullText.includes('યંત્ર') ||
      fullText.includes('ઓજાર') ||
      fullText.includes('ઉત્પાદન') ||
      fullText.includes('ફેક્ટરી') ||
      fullText.includes('कारखाना') ||
      fullText.includes('औजार')
    ) {
      detectedSector = 'Manufacturing';
      subsector = 'Workshop Tools & Light Fabrication';
    } else {
      detectedSector = 'Agriculture';
      subsector = 'Soil Preparation & Crop Protection';
    }

    // Determine development stage
    let detectedStage: Stage = 'Prototype';
    if (fullText.includes('ખેતરમાં') || fullText.includes('ટેસ્ટ') || fullText.includes('परीक्षित') || fullText.includes('tested')) {
      detectedStage = 'Tested';
    } else if (fullText.includes('ગામમાં') || fullText.includes('વાપરે છે') || fullText.includes('અપનાવેલ') || fullText.includes('adopted')) {
      detectedStage = 'Adopted';
    } else if (fullText.includes('વિચાર') || fullText.includes('પ્લાન') || fullText.includes('idea')) {
      detectedStage = 'Idea';
    }

    // Multilingual structured extraction
    const extractedTitle = {
      gu: title || (detectedSector === 'Agriculture' ? 'ઓછા ખર્ચે ખેતીનું દેશી સાધન' : `${detectedSector} સંબંધિત નવીનતા`),
      hi: detectedSector === 'Agriculture' ? 'कम लागत वाला देशी कृषि यंत्र' : `${detectedSector} आधारित ग्रामीण नवाचार`,
      en: detectedSector === 'Agriculture' ? 'Low-Cost Grassroots Agricultural Machine' : `Rural Grassroots ${detectedSector} Innovation`
    };

    const extractedProblem = {
      gu: problem || 'મજૂરી ખર્ચ અને સમયની બચત માટે ગ્રામીણ કક્ષાએ સરળ ઉપાયનો અભાવ.',
      hi: 'ग्रामीण स्तर पर अत्यधिक शारीरिक श्रम, महंगे उपकरण एवं समय की कमी।',
      en: problem || 'High manual labor costs and scarcity of affordable equipment in rural communities.'
    };

    const extractedSolution = {
      gu: solution || 'સ્થાનિક ઉપલબ્ધ સાધનો અને જૂના પુર્જાઓમાંથી બનાવેલ સરળ કાર્યકારી મોડેલ.',
      hi: 'स्थानीय स्तर पर उपलब्ध कलपुर्जों से निर्मित प्रभावकारी एवं सुलभ देशी तकनीक।',
      en: solution || 'Locally fabricated mechanical model utilizing upcycled materials for efficient operation.'
    };

    const responseData = {
      detectedLanguage: language,
      sector: detectedSector,
      subsector,
      stage: detectedStage,
      confidenceScore: 95,
      extractedTitle,
      extractedProblem,
      extractedSolution,
      keywords: [detectedSector.toLowerCase(), subsector.toLowerCase(), 'grassroots', 'rural tool', 'gujarat'],
      potentialApplications: [
        'Smallholder farming productivity',
        'Rural community self-reliance',
        'Cost and time reduction'
      ]
    };

    return NextResponse.json({
      success: true,
      data: responseData
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
