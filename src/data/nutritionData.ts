import { Language, RangeStatus } from '../types';

export interface NutrientFactor {
  name: string;
  role: string;
}

export interface FoodItem {
  name: string;
  nutrients: string;
}

export interface StructuredNutrition {
  nutrients: NutrientFactor[];
  vegetables?: FoodItem[];
  fruits?: FoodItem[];
  otherFoods?: FoodItem[];
}

export interface TestNutritionDefinition {
  aliases: string[];
  low?: {
    en: StructuredNutrition;
    hi: StructuredNutrition;
  };
  high?: {
    en: StructuredNutrition;
    hi: StructuredNutrition;
  };
}

export const TEST_NUTRITION_MAPPINGS: TestNutritionDefinition[] = [
  // 1. Hemoglobin & Red Blood Cell parameters
  {
    aliases: [
      'hemoglobin',
      'hgb',
      'hb',
      'hba',
      'red blood cell',
      'red blood cells',
      'rbc',
      'rbc count',
      'total rbc',
      'hematocrit',
      'hct',
      'pcv',
      'packed cell volume',
    ],
    low: {
      en: {
        nutrients: [
          { name: 'Iron', role: 'Involved in hemoglobin synthesis and oxygen transport in red blood cells' },
          { name: 'Folate (Vitamin B9)', role: 'Important for healthy red blood cell formation and cellular growth' },
          { name: 'Vitamin B12', role: 'Essential for red blood cell development, maturation, and neurological health' },
          { name: 'Vitamin C', role: 'Helps support the absorption of dietary plant-based (non-heme) iron' },
        ],
        vegetables: [
          { name: 'Spinach & Amaranth (Chaulai)', nutrients: 'Iron, folate, carotenoids' },
          { name: 'Broccoli & Brussels Sprouts', nutrients: 'Folate, vitamin C, plant iron' },
          { name: 'Beetroot & Greens', nutrients: 'Folate, iron, antioxidants' },
          { name: 'Fenugreek (Methi) Leaves', nutrients: 'Dietary iron, minerals' },
        ],
        fruits: [
          { name: 'Orange, Lemon & Citrus Fruits', nutrients: 'Vitamin C (facilitates non-heme iron absorption)' },
          { name: 'Guava', nutrients: 'High concentration of vitamin C' },
          { name: 'Pomegranate', nutrients: 'Vitamin C, polyphenols' },
          { name: 'Dried Figs (Anjeer) & Raisins', nutrients: 'Dietary iron, fiber' },
        ],
        otherFoods: [
          { name: 'Lentils, Moong Dal & Chickpeas', nutrients: 'Plant-based iron, folate, protein' },
          { name: 'Kidney Beans (Rajma) & Black Beans', nutrients: 'Iron, folate, dietary fiber' },
          { name: 'Eggs', nutrients: 'Vitamin B12, iron, high-biological-value protein' },
          { name: 'Milk, Curd & Paneer', nutrients: 'Vitamin B12, riboflavin' },
          { name: 'Lean Meat & Fish', nutrients: 'Highly bioavailable heme iron, vitamin B12' },
          { name: 'Pumpkin & Sesame (Til) Seeds', nutrients: 'Iron, zinc, magnesium' },
          { name: 'Fortified Whole Grain Cereals', nutrients: 'Iron, B-complex vitamins' },
        ],
      },
      hi: {
        nutrients: [
          { name: 'आयरन (Iron)', role: 'हीमोग्लोबिन और लाल रक्त कोशिकाओं के निर्माण व ऑक्सीजन परिवहन में सहायक' },
          { name: 'फोलेट (Folate / Vitamin B9)', role: 'स्वस्थ लाल रक्त कोशिकाओं के निर्माण और कोशिका विभाजन के लिए महत्वपूर्ण' },
          { name: 'विटामिन बी12 (Vitamin B12)', role: 'लाल रक्त कोशिकाओं के विकास, परिपक्वता और तंत्रिका स्वास्थ्य के लिए आवश्यक' },
          { name: 'विटामिन सी (Vitamin C)', role: 'आहार से पौधों पर आधारित आयरन के अवशोषण को बढ़ाने में सहायक' },
        ],
        vegetables: [
          { name: 'पालक और चौलाई का साग', nutrients: 'आयरन, फोलेट, कैरोटीनॉयड' },
          { name: 'ब्रोकली और हरी पत्तेदार सब्जियां', nutrients: 'फोलेट, विटामिन सी, आयरन' },
          { name: 'चुकंदर और चुकंदर के पत्ते', nutrients: 'फोलेट, आयरन, एंटीऑक्सीडेंट' },
          { name: 'मेथी के पत्ते', nutrients: 'आयरन और अन्य खनिज' },
        ],
        fruits: [
          { name: 'संतरा, मौसंबी व नींबू', nutrients: 'विटामिन सी (आयरन अवशोषण में सहायक)' },
          { name: 'अमरूद (Guava)', nutrients: 'विटामिन सी का समृद्ध स्रोत' },
          { name: 'अनार (Pomegranate)', nutrients: 'विटामिन सी, पॉलीफेनोल्स' },
          { name: 'सूखे अंजीर और किशमिश', nutrients: 'आयरन, फाइबर' },
        ],
        otherFoods: [
          { name: 'दालें, मूंग व चना', nutrients: 'आयरन, फोलेट, वनस्पति प्रोटीन' },
          { name: 'राजमा और काले चने', nutrients: 'आयरन, फोलेट, डायटरी फाइबर' },
          { name: 'अंडे (Eggs)', nutrients: 'विटामिन बी12, आयरन, प्रोटीन' },
          { name: 'दूध, दही व पनीर', nutrients: 'विटामिन बी12, राइबोफ्लेविन' },
          { name: 'लीन मीट व मछली', nutrients: 'आसानी से अवशोषित होने वाला हीम आयरन, विटामिन बी12' },
          { name: 'कद्दू और तिल के बीज', nutrients: 'आयरन, जिंक, मैग्नीशियम' },
          { name: 'फोर्टिफाइड साबुत अनाज', nutrients: 'आयरन, बी-कॉम्प्लेक्स विटामिन' },
        ],
      },
    },
  },

  // 2. Iron & Ferritin
  {
    aliases: [
      'iron',
      'serum iron',
      'ferritin',
      'serum ferritin',
      'total iron binding capacity',
      'tibc',
      'transferrin',
      'transferrin saturation',
      'uibc',
    ],
    low: {
      en: {
        nutrients: [
          { name: 'Iron (Heme & Non-Heme)', role: 'Core component of hemoglobin, myoglobin, and key metabolic enzymes' },
          { name: 'Vitamin C', role: 'Enhances the intestinal absorption of dietary non-heme iron' },
          { name: 'Copper', role: 'Supports cellular iron metabolism and normal transport' },
        ],
        vegetables: [
          { name: 'Spinach & Dark Leafy Greens', nutrients: 'Plant-based non-heme iron, folate' },
          { name: 'Moringa (Drumstick) Leaves', nutrients: 'Concentrated plant iron, vitamin C' },
          { name: 'Fenugreek (Methi) Leaves', nutrients: 'Iron, minerals' },
          { name: 'Kale & Mustard Greens (Sarson)', nutrients: 'Iron, vitamin C' },
        ],
        fruits: [
          { name: 'Amla (Indian Gooseberry)', nutrients: 'Very high vitamin C (supports iron absorption)' },
          { name: 'Guava & Citrus Fruits', nutrients: 'Vitamin C, bioflavonoids' },
          { name: 'Dried Apricots, Figs & Prunes', nutrients: 'Iron, fiber, potassium' },
        ],
        otherFoods: [
          { name: 'Lentils, Chickpeas & Soybeans', nutrients: 'Non-heme iron, zinc, protein' },
          { name: 'Sesame Seeds (Til) & Sunflower Seeds', nutrients: 'Iron, magnesium, copper' },
          { name: 'Lean Meats, Poultry & Fish', nutrients: 'High-bioavailability heme iron' },
          { name: 'Eggs', nutrients: 'Iron, vitamin B12' },
          { name: 'Fortified Oats & Cereals', nutrients: 'Iron, B vitamins' },
        ],
      },
      hi: {
        nutrients: [
          { name: 'आयरन (Iron)', role: 'हीमोग्लोबिन, मायोग्लोबिन और प्रमुख मेटाबॉलिक एंजाइमों का मुख्य घटक' },
          { name: 'विटामिन सी (Vitamin C)', role: 'आहार से पौधों पर आधारित नॉन-हीम आयरन के अवशोषण को बढ़ाता है' },
          { name: 'कॉपर (Copper)', role: 'आयरन के सामान्य अवशोषण और चयापचय में सहायता करता है' },
        ],
        vegetables: [
          { name: 'पालक व हरी पत्तेदार सब्जियां', nutrients: 'नॉन-हीम आयरन, फोलेट' },
          { name: 'सहजन के पत्ते (Moringa)', nutrients: 'प्राकृतिक आयरन, विटामिन सी' },
          { name: 'मेथी के पत्ते', nutrients: 'आयरन, खनिज' },
          { name: 'सरसों का साग व केल', nutrients: 'आयरन, विटामिन सी' },
        ],
        fruits: [
          { name: 'आंवला (Amla)', nutrients: 'उच्च विटामिन सी (आयरन अवशोषण में अत्यंत सहायक)' },
          { name: 'अमरूद, संतरा व मौसंबी', nutrients: 'विटामिन सी, बायोफ्लेवोनोइड्स' },
          { name: 'सूखे खुबानी, अंजीर व मुनक्का', nutrients: 'आयरन, फाइबर' },
        ],
        otherFoods: [
          { name: 'दालें, चना व सोयाबीन', nutrients: 'आयरन, जिंक, प्रोटीन' },
          { name: 'तिल और सूरजमुखी के बीज', nutrients: 'आयरन, मैग्नीशियम, कॉपर' },
          { name: 'लीन मीट, चिकन व मछली', nutrients: 'आसानी से अवशोषित होने वाला हीम आयरन' },
          { name: 'अंडे', nutrients: 'आयरन, विटामिन बी12' },
          { name: 'फोर्टिफाइड ओट्स व अनाज', nutrients: 'आयरन, बी-विटामिन' },
        ],
      },
    },
  },

  // 3. Vitamin B12 (Cobalamin)
  {
    aliases: [
      'vitamin b12',
      'serum vitamin b12',
      'vit b12',
      'b12',
      'cobalamin',
      'cyanocobalamin',
      'methylcobalamin',
    ],
    low: {
      en: {
        nutrients: [
          { name: 'Vitamin B12 (Cobalamin)', role: 'Essential for neurological health, DNA synthesis, and red blood cell production' },
        ],
        otherFoods: [
          { name: 'Milk, Curd & Yogurt', nutrients: 'Naturally occurring bioavailable Vitamin B12' },
          { name: 'Paneer & Cottage Cheese', nutrients: 'Vitamin B12, protein, calcium' },
          { name: 'Eggs', nutrients: 'Vitamin B12, choline, riboflavin' },
          { name: 'Fish (Salmon, Mackerel, Rohu, Tuna)', nutrients: 'High Vitamin B12, omega-3 fatty acids' },
          { name: 'Lean Poultry & Meat', nutrients: 'Concentrated dietary Vitamin B12' },
          { name: 'Fortified Plant Milk (Soy / Almond)', nutrients: 'Fortified Vitamin B12 for vegetarian/vegan diets' },
          { name: 'Fortified Breakfast Cereals & Nutritional Yeast', nutrients: 'Fortified Vitamin B12' },
        ],
      },
      hi: {
        nutrients: [
          { name: 'विटामिन बी12 (Cobalamin)', role: 'तंत्रिका तंत्र के स्वास्थ्य, डीएनए संश्लेषण और लाल रक्त कोशिकाओं के निर्माण हेतु आवश्यक' },
        ],
        otherFoods: [
          { name: 'दूध, दही और छाछ', nutrients: 'प्राकृतिक रूप से उपलब्ध विटामिन बी12' },
          { name: 'पनीर और कॉटेज चीज', nutrients: 'विटामिन बी12, प्रोटीन, कैल्शियम' },
          { name: 'अंडे (Eggs)', nutrients: 'विटामिन बी12, कोलीन, राइबोफ्लेविन' },
          { name: 'मछली (रोहू, कतला, सामन, टूना)', nutrients: 'उच्च विटामिन बी12, ओमेगा-3 फैटी एसिड' },
          { name: 'लीन चिकन व मीट', nutrients: 'विटामिन बी12 का समृद्ध स्रोत' },
          { name: 'फोर्टिफाइड सोया / बादाम मिल्क', nutrients: 'शाकाहारी आहार के लिए फोर्टिफाइड बी12' },
          { name: 'फोर्टिफाइड अनाज व न्यूट्रिशनल यीस्ट', nutrients: 'फोर्टिफाइड विटामिन बी12' },
        ],
      },
    },
  },

  // 4. Folate / Folic Acid
  {
    aliases: [
      'folate',
      'folic acid',
      'serum folate',
      'vitamin b9',
      'vit b9',
      'b9',
      'rbc folate',
    ],
    low: {
      en: {
        nutrients: [
          { name: 'Folate (Vitamin B9)', role: 'Crucial coenzyme for cell division, tissue growth, and red blood cell synthesis' },
        ],
        vegetables: [
          { name: 'Spinach & Mustard Greens (Sarson)', nutrients: 'Rich in natural dietary folate' },
          { name: 'Broccoli & Asparagus', nutrients: 'Folate, vitamin C, dietary fiber' },
          { name: 'Green Peas (Matar) & Okra (Bhindi)', nutrients: 'Folate, plant protein' },
          { name: 'Cauliflower & Cabbage', nutrients: 'Folate, glucosinolates' },
        ],
        fruits: [
          { name: 'Oranges & Citrus Fruits', nutrients: 'Folate, vitamin C' },
          { name: 'Papaya', nutrients: 'Folate, carotenoids, vitamin A' },
          { name: 'Avocado', nutrients: 'Folate, healthy monounsaturated fats' },
          { name: 'Bananas', nutrients: 'Folate, potassium' },
        ],
        otherFoods: [
          { name: 'Lentils, Chana Dal & Black Eyed Peas (Lobia)', nutrients: 'High concentration of natural dietary folate' },
          { name: 'Chickpeas & Kidney Beans', nutrients: 'Folate, protein, complex carbs' },
          { name: 'Peanuts & Sunflower Seeds', nutrients: 'Folate, vitamin E, healthy fats' },
          { name: 'Fortified Whole Grain Products', nutrients: 'Folic acid, B vitamins' },
          { name: 'Eggs', nutrients: 'Folate, choline, protein' },
        ],
      },
      hi: {
        nutrients: [
          { name: 'फोलेट (Vitamin B9)', role: 'कोशिका विभाजन, ऊतक विकास और लाल रक्त कोशिकाओं के निर्माण के लिए आवश्यक' },
        ],
        vegetables: [
          { name: 'पालक और सरसों का साग', nutrients: 'प्राकृतिक फोलेट का उत्कृष्ट स्रोत' },
          { name: 'ब्रोकली और शतावरी', nutrients: 'फोलेट, विटामिन सी, फाइबर' },
          { name: 'हरी मटर और भिंडी', nutrients: 'फोलेट, पादप प्रोटीन' },
          { name: 'फूलगोभी और पत्तागोभी', nutrients: 'फोलेट, एंटीऑक्सीडेंट' },
        ],
        fruits: [
          { name: 'संतरा और मौसंबी', nutrients: 'फोलेट, विटामिन सी' },
          { name: 'पपीता (Papaya)', nutrients: 'फोलेट, कैरोटीनॉयड' },
          { name: 'एवोकाडो (Avocado)', nutrients: 'फोलेट, स्वस्थ वसा' },
          { name: 'केला (Banana)', nutrients: 'फोलेट, पोटेशियम' },
        ],
        otherFoods: [
          { name: 'दालें, चना दाल और लोबिया', nutrients: 'प्राकृतिक आहार फोलेट का समृद्ध स्रोत' },
          { name: 'काबुली चना और राजमा', nutrients: 'फोलेट, प्रोटीन, फाइबर' },
          { name: 'मूंगफली और सूरजमुखी के बीज', nutrients: 'फोलेट, विटामिन ई' },
          { name: 'फोर्टिफाइड साबुत अनाज', nutrients: 'फोलिक एसिड, बी-विटामिन' },
          { name: 'अंडे', nutrients: 'फोलेट, प्रोटीन' },
        ],
      },
    },
  },

  // 5. Vitamin D
  {
    aliases: [
      'vitamin d',
      '25-oh vitamin d',
      '25-hydroxy vitamin d',
      'vit d',
      'calcidiol',
      'cholecalciferol',
      'vitamin d3',
      '25-hydroxycholecalciferol',
      '25-oh vit d',
    ],
    low: {
      en: {
        nutrients: [
          { name: 'Vitamin D (Cholecalciferol)', role: 'Regulates intestinal calcium and phosphorus absorption, bone mineralization, and immune function' },
          { name: 'Calcium & Magnesium', role: 'Minerals that work synergistically with Vitamin D for bone and cellular health' },
        ],
        otherFoods: [
          { name: 'Fortified Milk, Curd & Dairy Products', nutrients: 'Fortified Vitamin D3 and bioavailable calcium' },
          { name: 'Fortified Plant Milk (Soy / Almond / Oat)', nutrients: 'Fortified Vitamin D for non-dairy diets' },
          { name: 'Egg Yolks', nutrients: 'Natural Vitamin D, choline, fat-soluble vitamins' },
          { name: 'Fatty Fish (Salmon, Mackerel, Sardines, Rohu)', nutrients: 'Natural Vitamin D3, omega-3 fatty acids' },
          { name: 'Sun-Exposed Mushrooms', nutrients: 'Natural plant-derived Vitamin D2' },
          { name: 'Fortified Breakfast Cereals', nutrients: 'Fortified Vitamin D and minerals' },
        ],
      },
      hi: {
        nutrients: [
          { name: 'विटामिन डी (Cholecalciferol)', role: 'कैल्शियम व फास्फोरस के अवशोषण, हड्डियों की मजबूती और प्रतिरक्षा प्रणाली के लिए आवश्यक' },
          { name: 'कैल्शियम और मैग्नीशियम', role: 'हड्डियों के स्वास्थ्य हेतु विटामिन डी के साथ मिलकर काम करने वाले खनिज' },
        ],
        otherFoods: [
          { name: 'फोर्टिफाइड दूध, दही व डेयरी उत्पाद', nutrients: 'फोर्टिफाइड विटामिन डी3 और कैल्शियम' },
          { name: 'फोर्टिफाइड सोया / बादाम मिल्क', nutrients: 'शाकाहारी आहार हेतु फोर्टिफाइड विटामिन डी' },
          { name: 'अंडे की जर्दी (Egg yolk)', nutrients: 'प्राकृतिक विटामिन डी, कोलीन' },
          { name: 'वसायुक्त मछली (सामन, मैकेरल, रोहू)', nutrients: 'प्राकृतिक विटामिन डी3, ओमेगा-3 फैटी एसिड' },
          { name: 'धूप में रखे मशरूम (Mushrooms)', nutrients: 'प्राकृतिक विटामिन डी2' },
          { name: 'फोर्टिफाइड अनाज', nutrients: 'विटामिन डी और खनिज' },
        ],
      },
    },
  },

  // 6. Calcium
  {
    aliases: [
      'calcium',
      'serum calcium',
      'ca',
      'total calcium',
      'ionized calcium',
    ],
    low: {
      en: {
        nutrients: [
          { name: 'Calcium', role: 'Essential for bone structural integrity, muscle contractions, cardiac rhythm, and nerve signaling' },
          { name: 'Vitamin D', role: 'Required for active intestinal absorption of dietary calcium' },
        ],
        vegetables: [
          { name: 'Kale, Collard Greens & Bok Choy', nutrients: 'Highly bioavailable calcium' },
          { name: 'Okra (Bhindi) & Green Beans', nutrients: 'Calcium, soluble fiber' },
          { name: 'Moringa (Drumstick) Leaves', nutrients: 'Plant calcium, vitamin C' },
          { name: 'Broccoli', nutrients: 'Calcium, vitamin K' },
        ],
        fruits: [
          { name: 'Dried Figs (Anjeer)', nutrients: 'Concentrated plant calcium, dietary fiber' },
          { name: 'Oranges', nutrients: 'Calcium, vitamin C' },
        ],
        otherFoods: [
          { name: 'Milk, Curd, Paneer & Cheese', nutrients: 'Readily absorbable dietary calcium and protein' },
          { name: 'Sesame Seeds (Til)', nutrients: 'Very high plant-based calcium content' },
          { name: 'Calcium-Set Tofu', nutrients: 'Plant calcium, protein' },
          { name: 'Almonds (Badam)', nutrients: 'Calcium, vitamin E, healthy fats' },
          { name: 'Fortified Plant-Based Milks', nutrients: 'Fortified calcium and vitamin D' },
        ],
      },
      hi: {
        nutrients: [
          { name: 'कैल्शियम (Calcium)', role: 'हड्डियों की मजबूती, मांसपेशियों के संकुचन, हृदय गति और तंत्रिका संकेतों के लिए आवश्यक' },
          { name: 'विटामिन डी (Vitamin D)', role: 'आहार से कैल्शियम के उचित अवशोषण के लिए आवश्यक' },
        ],
        vegetables: [
          { name: 'केल और हरी पत्तेदार सब्जियां', nutrients: 'आसानी से पचने योग्य कैल्शियम' },
          { name: 'भिंडी और हरी बीन्स', nutrients: 'कैल्शियम, डायटरी फाइबर' },
          { name: 'सहजन के पत्ते (Moringa)', nutrients: 'पादप कैल्शियम, विटामिन सी' },
          { name: 'ब्रोकली', nutrients: 'कैल्शियम, विटामिन के' },
        ],
        fruits: [
          { name: 'सूखे अंजीर (Anjeer)', nutrients: 'प्राकृतिक कैल्शियम, फाइबर' },
          { name: 'संतरा', nutrients: 'कैल्शियम, विटामिन सी' },
        ],
        otherFoods: [
          { name: 'दूध, दही, पनीर व चीज', nutrients: 'आसानी से अवशोषित होने वाला कैल्शियम और प्रोटीन' },
          { name: 'तिल के बीज (Til)', nutrients: 'उच्च पादप कैल्शियम' },
          { name: 'टोफू (Tofu)', nutrients: 'कैल्शियम, वनस्पति प्रोटीन' },
          { name: 'बादाम (Almonds)', nutrients: 'कैल्शियम, विटामिन ई' },
          { name: 'फोर्टिफाइड सोया/बादाम मिल्क', nutrients: 'कैल्शियम और विटामिन डी' },
        ],
      },
    },
  },

  // 7. Glucose & Glycemic Markers (HbA1c, FBS, PPBS)
  {
    aliases: [
      'glucose',
      'blood glucose',
      'fasting blood sugar',
      'fbs',
      'fasting glucose',
      'postprandial glucose',
      'ppbs',
      'random blood sugar',
      'rbs',
      'hba1c',
      'glycated hemoglobin',
      'glycohemoglobin',
      'estimated average glucose',
      'eag',
    ],
    high: {
      en: {
        nutrients: [
          { name: 'Soluble & Insoluble Dietary Fiber', role: 'Helps slow carbohydrate digestion and postprandial glucose absorption' },
          { name: 'Low Glycemic Index Complex Carbohydrates', role: 'Provides steady, sustained energy release without rapid glucose spikes' },
          { name: 'Magnesium & Chromium', role: 'Essential minerals involved in carbohydrate and cellular insulin metabolism' },
        ],
        vegetables: [
          { name: 'Bitter Gourd (Karela)', nutrients: 'Charantin, plant polypeptide-p, soluble fiber' },
          { name: 'Fenugreek (Methi) Leaves', nutrients: 'Soluble galactomannan fiber, 4-hydroxyisoleucine' },
          { name: 'Spinach, Cabbage & Cauliflower', nutrients: 'Low glycemic load, dietary fiber, micronutrients' },
          { name: 'Okra (Bhindi)', nutrients: 'Mucilage soluble fiber' },
          { name: 'Cucumber & Zucchini', nutrients: 'High water content, low carbohydrate load' },
        ],
        fruits: [
          { name: 'Guava', nutrients: 'High dietary fiber, low glycemic index' },
          { name: 'Jamun (Indian Blackberry)', nutrients: 'Anthocyanins, ellagic acid' },
          { name: 'Apples & Pears (with peel)', nutrients: 'Pectin soluble fiber' },
          { name: 'Berries (Strawberries, Blueberries)', nutrients: 'Low sugar content, polyphenols, fiber' },
        ],
        otherFoods: [
          { name: 'Rolled Oats & Whole Barley (Jau)', nutrients: 'Beta-glucan soluble fiber' },
          { name: 'Whole Moong, Chana & Lentils', nutrients: 'Complex carbohydrates, plant protein, fiber' },
          { name: 'Chia Seeds & Flaxseeds', nutrients: 'Soluble fiber, alpha-linolenic omega-3' },
          { name: 'Walnuts & Almonds', nutrients: 'Healthy fats, low carbohydrates, magnesium' },
          { name: 'Cinnamon (Dalchini)', nutrients: 'Bioactive polyphenolic compounds' },
        ],
      },
      hi: {
        nutrients: [
          { name: 'घुलनशील व अघुलनशील डायटरी फाइबर', role: 'कार्बोहाइड्रेट के पाचन को धीमा करके ब्लड शुगर के अचानक बढ़ने को रोकने में सहायक' },
          { name: 'कम ग्लाइसेमिक इंडेक्स (Low GI) वाले जटिल कार्बोहाइड्रेट', role: 'ऊर्जा का धीमा और स्थिर प्रवाह प्रदान करते हैं' },
          { name: 'मैग्नीशियम और क्रोमियम', role: 'इंसुलिन संवेदनशीलता और कार्बोहाइड्रेट चयापचय में सहायक आवश्यक खनिज' },
        ],
        vegetables: [
          { name: 'करेला (Bitter Gourd)', nutrients: 'चारेंटिन, पादप पेप्टाइड, घुलनशील फाइबर' },
          { name: 'मेथी के पत्ते (Methi)', nutrients: 'गैलेक्टोमैनन फाइबर, सक्रिय पादप यौगिक' },
          { name: 'पालक, पत्तागोभी व फूलगोभी', nutrients: 'कम ग्लाइसेमिक लोड, उच्च फाइबर' },
          { name: 'भिंडी (Okra)', nutrients: 'घुलनशील फाइबर' },
          { name: 'खीरा, ककड़ी व तोरी', nutrients: 'उच्च जलयोजन, नगण्य कार्बोहाइड्रेट' },
        ],
        fruits: [
          { name: 'अमरूद (Guava)', nutrients: 'उच्च फाइबर, कम ग्लाइसेमिक इंडेक्स' },
          { name: 'जामुन (Jamun)', nutrients: 'एंथोसायनिन, प्राकृतिक यौगिक' },
          { name: 'सेब और नाशपाती (छिलके सहित)', nutrients: 'पेक्टिन घुलनशील फाइबर' },
          { name: 'स्ट्रॉबेरी और जामुन/बेरीज', nutrients: 'कम प्राकृतिक शुगर, एंटीऑक्सीडेंट' },
        ],
        otherFoods: [
          { name: 'साबुत ओट्स और जौ (Jau)', nutrients: 'बीटा-ग्लूकन घुलनशील फाइबर' },
          { name: 'साबुत मूंग, काला चना व दालें', nutrients: 'जटिल कार्बोहाइड्रेट, प्रोटीन, फाइबर' },
          { name: 'चिया सीड्स और अलसी (Flaxseeds)', nutrients: 'घुलनशील फाइबर, ओमेगा-3' },
          { name: 'अखरोट और बादाम', nutrients: 'स्वस्थ वसा, मैग्नीशियम' },
          { name: 'दालचीनी (Cinnamon)', nutrients: 'बायोएक्टिव पॉलीफेनोल्स' },
        ],
      },
    },
  },

  // 8. Lipid Panel (Cholesterol, LDL, Triglycerides)
  {
    aliases: [
      'cholesterol',
      'total cholesterol',
      'ldl',
      'ldl cholesterol',
      'ldl-c',
      'triglycerides',
      'tg',
      'vldl',
      'vldl cholesterol',
      'non-hdl cholesterol',
      'lipid profile',
    ],
    high: {
      en: {
        nutrients: [
          { name: 'Soluble Dietary Fiber', role: 'Binds with bile acids in the digestive system to facilitate natural cholesterol clearance' },
          { name: 'Unsaturated Fatty Acids (MUFA & PUFA)', role: 'Healthy dietary fats that support balanced lipid transport and cardiovascular wellness' },
          { name: 'Omega-3 Fatty Acids', role: 'Helps support normal triglyceride metabolism' },
          { name: 'Plant Sterols & Stanols', role: 'Naturally occurring plant compounds that compete with dietary cholesterol absorption' },
        ],
        vegetables: [
          { name: 'Garlic', nutrients: 'Allicin, organosulfur compounds' },
          { name: 'Okra (Bhindi)', nutrients: 'Pectin soluble fiber' },
          { name: 'Eggplant (Baingan)', nutrients: 'Dietary soluble fiber, nasunin' },
          { name: 'Carrots & Beetroot', nutrients: 'Pectin, carotenoids, fiber' },
          { name: 'Leafy Greens (Spinach, Kale)', nutrients: 'Lutein, carotenoids, dietary fiber' },
        ],
        fruits: [
          { name: 'Apples & Citrus Fruits', nutrients: 'Pectin soluble fiber, bioflavonoids' },
          { name: 'Berries (Strawberries, Blueberries)', nutrients: 'Polyphenols, anthocyanins, fiber' },
          { name: 'Avocado', nutrients: 'Monounsaturated oleic acid, plant sterols' },
          { name: 'Pomegranate', nutrients: 'Polyphenols, punicalagin' },
        ],
        otherFoods: [
          { name: 'Rolled Oats & Oat Bran', nutrients: 'Beta-glucan soluble fiber' },
          { name: 'Barley (Jau)', nutrients: 'Soluble dietary fiber' },
          { name: 'Flaxseeds & Chia Seeds', nutrients: 'Alpha-linolenic omega-3, lignans, fiber' },
          { name: 'Walnuts & Almonds', nutrients: 'Plant sterols, unsaturated fats, vitamin E' },
          { name: 'Olive Oil & Mustard Oil', nutrients: 'Monounsaturated fatty acids' },
          { name: 'Lentils, Chickpeas & Kidney Beans', nutrients: 'Soluble fiber, plant protein' },
        ],
      },
      hi: {
        nutrients: [
          { name: 'घुलनशील डायटरी फाइबर (Soluble Fiber)', role: 'पाचन तंत्र में कोलेस्ट्रॉल के प्राकृतिक उत्सर्जन में सहायता करता है' },
          { name: 'अनसैचुरेटेड फैटी एसिड्स (MUFA / PUFA)', role: 'स्वस्थ वसा जो संतुलित लिपिड प्रोफाइल और हृदय स्वास्थ्य का समर्थन करती हैं' },
          { name: 'ओमेगा-3 फैटी एसिड्स', role: 'ट्राइग्लिसराइड्स के सामान्य चयापचय में सहायक' },
          { name: 'पादप स्टेरोल्स (Plant Sterols)', role: 'प्राकृतिक पादप यौगिक जो कोलेस्ट्रॉल अवशोषण को संतुलित करते हैं' },
        ],
        vegetables: [
          { name: 'लहसुन (Garlic)', nutrients: 'एलिसिन, कार्बनिक सल्फर यौगिक' },
          { name: 'भिंडी (Okra)', nutrients: 'पेक्टिन घुलनशील फाइबर' },
          { name: 'बैंगन (Eggplant)', nutrients: 'घुलनशील फाइबर, एंटीऑक्सीडेंट' },
          { name: 'गाजर और चुकंदर', nutrients: 'पेक्टिन, कैरोटीनॉयड, फाइबर' },
          { name: 'पालक व हरी पत्तेदार सब्जियां', nutrients: 'ल्यूटिन, एंटीऑक्सीडेंट, फाइबर' },
        ],
        fruits: [
          { name: 'सेब और संतरा/मौसंबी', nutrients: 'पेक्टिन घुलनशील फाइबर, बायोफ्लेवोनोइड्स' },
          { name: 'बेरीज (स्ट्रॉबेरी, ब्लूबेरी)', nutrients: 'पॉलीफेनोल्स, एंथोसायनिन, फाइबर' },
          { name: 'एवोकाडो (Avocado)', nutrients: 'मोनोअनसैचुरेटेड वसा, पादप स्टेरोल्स' },
          { name: 'अनार (Pomegranate)', nutrients: 'पॉलीफेनोल्स' },
        ],
        otherFoods: [
          { name: 'साबुत ओट्स और ओट ब्रान', nutrients: 'बीटा-ग्लूकन घुलनशील फाइबर' },
          { name: 'जौ (Jau)', nutrients: 'घुलनशील डायटरी फाइबर' },
          { name: 'अलसी (Flaxseeds) और चिया बीज', nutrients: 'ओमेगा-3 फैटी एसिड, लिग्नन्स' },
          { name: 'अखरोट और बादाम', nutrients: 'पादप स्टेरोल्स, अनसैचुरेटेड फैट्स' },
          { name: 'जैतून का तेल व सरसों का तेल', nutrients: 'मोनोअनसैचुरेटेड फैटी एसिड्स' },
          { name: 'दालें, चना और राजमा', nutrients: 'घुलनशील फाइबर, वनस्पति प्रोटीन' },
        ],
      },
    },
  },

  // 9. Potassium
  {
    aliases: [
      'potassium',
      'serum potassium',
      'k',
      'k+',
    ],
    low: {
      en: {
        nutrients: [
          { name: 'Potassium', role: 'Major intracellular cation critical for fluid balance, nerve transmission, muscle contractions, and normal blood pressure regulation' },
        ],
        vegetables: [
          { name: 'Spinach & Cooked Leafy Greens', nutrients: 'Potassium, magnesium, folate' },
          { name: 'Potatoes & Sweet Potatoes (with skin)', nutrients: 'High dietary potassium, complex carbs' },
          { name: 'Tomatoes & Tomato Paste', nutrients: 'Potassium, lycopene' },
          { name: 'Bottle Gourd (Lauki) & Zucchini', nutrients: 'Potassium, gentle hydration' },
        ],
        fruits: [
          { name: 'Bananas', nutrients: 'Readily accessible dietary potassium' },
          { name: 'Tender Coconut Water', nutrients: 'Natural electrolyte-rich potassium' },
          { name: 'Oranges, Mosambi & Melons', nutrients: 'Potassium, vitamin C, hydration' },
          { name: 'Dried Apricots, Prunes & Raisins', nutrients: 'Concentrated mineral potassium' },
        ],
        otherFoods: [
          { name: 'Coconut Water', nutrients: 'Electrolyte potassium and hydration' },
          { name: 'Lentils, Rajma & Soybeans', nutrients: 'Potassium, plant protein, minerals' },
          { name: 'Plain Curd / Yogurt', nutrients: 'Potassium, calcium, probiotics' },
          { name: 'Pumpkin & Sunflower Seeds', nutrients: 'Potassium, magnesium' },
        ],
      },
      hi: {
        nutrients: [
          { name: 'पोटेशियम (Potassium)', role: 'तरल संतुलन, तंत्रिका संकेतों, मांसपेशियों के संकुचन और सामान्य रक्तचाप के लिए आवश्यक प्रमुख इलेक्ट्रोलाइट' },
        ],
        vegetables: [
          { name: 'पालक व पकी हुई हरी सब्जियां', nutrients: 'पोटेशियम, मैग्नीशियम' },
          { name: 'आलू और शकरकंद (छिलके सहित)', nutrients: 'पोटेशियम का समृद्ध स्रोत' },
          { name: 'टमाटर (Tomatoes)', nutrients: 'पोटेशियम, लाइकोपीन' },
          { name: 'लौकी और तोरी', nutrients: 'पोटेशियम, हाइड्रेशन' },
        ],
        fruits: [
          { name: 'केला (Bananas)', nutrients: 'पोटेशियम का सुलभ और प्राकृतिक स्रोत' },
          { name: 'ताजा नारियल पानी', nutrients: 'प्राकृतिक इलेक्ट्रोलाइट और पोटेशियम' },
          { name: 'संतरा, मौसंबी व खरबूजा', nutrients: 'पोटेशियम, विटामिन सी, जलयोजन' },
          { name: 'सूखे खुबानी और किशमिश', nutrients: 'पोटेशियम, फाइबर' },
        ],
        otherFoods: [
          { name: 'नारियल पानी (Coconut water)', nutrients: 'इलेक्ट्रोलाइट्स और प्राकृतिक पोटेशियम' },
          { name: 'दालें, राजमा और सोयाबीन', nutrients: 'पोटेशियम, वनस्पति प्रोटीन' },
          { name: 'सादा दही और छाछ', nutrients: 'पोटेशियम, कैल्शियम, प्रोबायोटिक्स' },
          { name: 'कद्दू व सूरजमुखी के बीज', nutrients: 'पोटेशियम, मैग्नीशियम' },
        ],
      },
    },
  },

  // 10. Uric Acid
  {
    aliases: [
      'uric acid',
      'serum uric acid',
      'urate',
    ],
    high: {
      en: {
        nutrients: [
          { name: 'Dietary Hydration & Water', role: 'Supports renal dilution and natural urinary clearance of uric acid' },
          { name: 'Vitamin C', role: 'Helps support renal urate excretion' },
          { name: 'Low-Purine Plant Foods', role: 'Minimizes endogenous purine load while providing essential micronutrients' },
        ],
        vegetables: [
          { name: 'Cucumber, Bottle Gourd (Lauki) & Zucchini', nutrients: 'Low-purine, high-hydration vegetables' },
          { name: 'Bell Peppers (Capsicum)', nutrients: 'Low-purine, rich in vitamin C' },
          { name: 'Celery', nutrients: 'Luteolin, hydration' },
          { name: 'Carrots & Cabbage', nutrients: 'Low-purine dietary fiber' },
        ],
        fruits: [
          { name: 'Cherries & Tart Cherries', nutrients: 'Anthocyanins associated with supporting balanced urate levels' },
          { name: 'Citrus Fruits (Lemons, Oranges, Amla)', nutrients: 'Vitamin C, citric acid' },
          { name: 'Berries (Strawberries, Blueberries)', nutrients: 'Antioxidants, polyphenols' },
          { name: 'Watermelon & Muskmelon', nutrients: 'High water content for urinary hydration' },
        ],
        otherFoods: [
          { name: 'Ample Fresh Drinking Water & Lemon Water', nutrients: 'Promotes urinary dilution and renal clearance' },
          { name: 'Low-Fat Curd, Milk & Dairy', nutrients: 'Low-purine proteins containing orotic acid' },
          { name: 'Whole Oats & Brown Rice', nutrients: 'Low-purine complex carbohydrates' },
          { name: 'Flaxseeds & Walnuts', nutrients: 'Anti-inflammatory omega-3 fatty acids' },
        ],
      },
      hi: {
        nutrients: [
          { name: 'पर्याप्त जल व हाइड्रेशन', role: 'यूरिक एसिड के प्राकृतिक निष्कासन और गुर्दे के सामान्य कार्य में सहायक' },
          { name: 'विटामिन सी (Vitamin C)', role: 'गुर्दे द्वारा यूरिक एसिड के सामान्य उत्सर्जन में सहायक' },
          { name: 'कम प्यूरीन वाले खाद्य पदार्थ', role: 'शरीर में यूरिक एसिड के निर्माण को कम करने में सहायक' },
        ],
        vegetables: [
          { name: 'खीरा, लौकी, तोरी व कद्दू', nutrients: 'कम प्यूरीन, उच्च जलयोजन वाली सब्जियां' },
          { name: 'शिमला मिर्च (Capsicum)', nutrients: 'कम प्यूरीन, विटामिन सी' },
          { name: 'अजवाइन / सेलरी', nutrients: 'एंटीऑक्सीडेंट, हाइड्रेशन' },
          { name: 'गाजर और पत्तागोभी', nutrients: 'कम प्यूरीन, फाइबर' },
        ],
        fruits: [
          { name: 'चेरी (Cherries)', nutrients: 'एंथोसायनिन (यूरिक एसिड संतुलन में सहायक)' },
          { name: 'नींबू, संतरा व आंवला', nutrients: 'विटामिन सी, साइट्रिक एसिड' },
          { name: 'स्ट्रॉबेरी और ब्लूबेरी', nutrients: 'एंटीऑक्सीडेंट, पॉलीफेनोल्स' },
          { name: 'तरबूज और खरबूजा', nutrients: 'उच्च जल सामग्री, हाइड्रेशन' },
        ],
        otherFoods: [
          { name: 'प्रचुर मात्रा में सादा पानी व नींबू पानी', nutrients: 'यूरिक एसिड के निष्कासन हेतु' },
          { name: 'कम वसा वाला दूध और दही', nutrients: 'कम प्यूरीन प्रोटीन' },
          { name: 'साबुत ओट्स व ब्राउन राइस', nutrients: 'कम प्यूरीन वाले जटिल कार्बोहाइड्रेट' },
          { name: 'अलसी और अखरोट', nutrients: 'ओमेगा-3 फैटी एसिड' },
        ],
      },
    },
  },
];

/**
 * Normalizes a test name by removing punctuation, extra spaces, and converting to lowercase.
 */
function normalizeTestName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Retrieves structured test-specific nutrition information if and only if:
 * 1. The test status is abnormal ("Above Range" or "Below Range")
 * 2. A meaningful, test-specific dietary relationship exists in the nutrition mapping.
 *
 * Returns null for:
 * - "Within Range" tests
 * - "Unable to determine" tests
 * - Abnormal tests without a direct nutritional relationship (e.g. MPV, P-LCR, Platelets, WBC, ESR, Creatinine, etc.)
 */
export function getTestNutritionInfo(
  testName: string,
  status: RangeStatus,
  language: Language = 'en'
): StructuredNutrition | null {
  // 1. If within range or unable to determine, NEVER return food sources
  if (status !== 'Above Range' && status !== 'Below Range') {
    return null;
  }

  const normalized = normalizeTestName(testName);
  const langKey = language === 'hi' ? 'hi' : 'en';

  for (const entry of TEST_NUTRITION_MAPPINGS) {
    const isMatch = entry.aliases.some((alias) => {
      const normAlias = normalizeTestName(alias);
      return (
        normalized === normAlias ||
        normalized.includes(normAlias) ||
        normAlias.includes(normalized)
      );
    });

    if (isMatch) {
      if (status === 'Below Range' && entry.low) {
        return entry.low[langKey];
      }
      if (status === 'Above Range' && entry.high) {
        return entry.high[langKey];
      }
    }
  }

  // No specific dietary mapping exists for this test
  return null;
}
