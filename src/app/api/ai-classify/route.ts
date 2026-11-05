import { NextResponse } from 'next/server';
import { Sector, Stage } from '@/types/innovategram';

export async function POST(request: Request) {
  try {
    const { transcript, language = 'en' } = await request.json();

    if (!transcript) {
      return NextResponse.json(
        { success: false, error: 'Voice transcript or text is required' },
        { status: 400 }
      );
    }

    const tLower = transcript.toLowerCase();

    let detectedSector: Sector = 'Agriculture';
    let detectedStage: Stage = 'Prototype';

    if (tLower.includes('water') || tLower.includes('पानी') || tLower.includes('પાણી')) {
      detectedSector = 'Water and Sanitation';
    } else if (tLower.includes('solar') || tLower.includes('सौर') || tLower.includes('સોલાર') || tLower.includes('battery')) {
      detectedSector = 'Renewable Energy';
    } else if (tLower.includes('health') || tLower.includes('स्वास्थ्य') || tLower.includes('દવા')) {
      detectedSector = 'Healthcare';
    } else if (tLower.includes('school') || tLower.includes('शिक्षा') || tLower.includes('શાળા')) {
      detectedSector = 'Education';
    } else if (tLower.includes('waste') || tLower.includes('कचरा') || tLower.includes('પરાળી') || tLower.includes('पराली')) {
      detectedSector = 'Waste Management';
    } else if (tLower.includes('walker') || tLower.includes('दिव्यांग') || tLower.includes('વોકર')) {
      detectedSector = 'Assistive Technology';
    }

    const responseData = {
      detectedLanguage: language,
      sector: detectedSector,
      stage: detectedStage,
      confidenceScore: 94,
      extractedTitle: {
        en: 'Grassroots Mechanical Innovation',
        hi: 'जमीनी यांत्रिक नवाचार',
        gu: 'પાયાનું યાંત્રિક આવિષ્કાર'
      },
      extractedProblem: {
        en: 'Labor intensiveness and lack of accessible equipment in rural areas.',
        hi: 'ग्रामीण क्षेत्रों में महंगे उपकरण और शारीरिक श्रम की अधिकता।',
        gu: 'ગ્રામીણ વિસ્તારોમાં સાધનોની અછત અને વધુ પડતી મહેનત.'
      },
      extractedSolution: {
        en: 'Locally fabricated solution utilizing upcycled components.',
        hi: 'स्थानीय स्तर पर उपलब्ध कलपुर्जों से तैयार किया गया प्रभावी उपाय।',
        gu: 'સ્થાનિક ઉપલબ્ધ સાધનોમાંથી તૈયાર કરેલ અસરકારક ઉપાય.'
      },
      keywords: [detectedSector.toLowerCase(), 'grassroots', 'rural tool']
    };

    return NextResponse.json({
      success: true,
      data: responseData
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

