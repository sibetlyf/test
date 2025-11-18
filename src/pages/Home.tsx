import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// 立冬相关的图片资源
const winterImages = [
  "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=winter%20season%20snow%20landscape%20traditional%20chinese%20painting%20style&sign=176028664aa6a726a937c81d5982764a",
  "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=chinese%20traditional%20food%20for%20winter%20solar%20term&sign=df7f488b116d8634339e4e2048eba4a7",
  "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=ancient%20chinese%20people%20celebrating%20beginning%20of%20winter&sign=a2ca69d8efc6a6b5442033ed968c5b22",
  "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=chinese%20poetry%20about%20winter%20calligraphy%20art&sign=c73da4de436d10cb630ef3576d08fba7"
];

// 立冬相关的传统习俗数据
const customsData = [
  {
    title: "吃饺子",
    description: "立冬是秋冬季节之交，故“交”子之时的饺子不能不吃。",
    icon: "fa-utensils"
  },
  {
    title: "补冬",
    description: "民间有立冬补冬的习俗，认为此时进补，营养会被身体更好地吸收。",
    icon: "fa-apple-alt"
  },
  {
    title: "祭祀祖先",
    description: "立冬有祭祀祖先的传统，表达对先人的追思和感恩。",
    icon: "fa-landmark"
  },
  {
    title: "酿黄酒",
    description: "在浙江绍兴地区，立冬之日开始酿黄酒，称为“冬酿”。",
    icon: "fa-wine-bottle"
  }
];

// 立冬相关的诗词
const poemsData = [
  {
    title: "立冬",
    author: "李白",
    content: "冻笔新诗懒写，寒炉美酒时温。醉看墨花月白，恍疑雪满前村。"
  },
  {
    title: "立冬即事二首",
    author: "仇远",
    content: "细雨生寒未有霜，庭前木叶半青黄。小春此去无多日，何处梅花一绽香。"
  },
  {
    title: "立冬",
    author: "王稚登",
    content: "秋风吹尽旧庭柯，黄叶丹枫客里过。一点禅灯半轮月，今宵寒较昨宵多。"
  }
];

// 立冬的历史渊源数据
const historyData = [
  {
    title: "节气由来",
    content: "立冬是二十四节气之一，也是汉族传统节日之一，时间点在公历每年11月7-8日之间。立冬过后，日照时间将继续缩短，正午太阳高度继续降低。"
  },
  {
    title: "气候特征",
    content: "立冬前后，中国大部分地区降水显著减少，北方地区大地封冻，农林作物进入越冬期。南方地区则是“小阳春”天气，依然温暖舒适。"
  },
  {
    title: "物候现象",
    content: "一候水始冰：水已经能结成冰；二候地始冻：土地也开始冻结；三候雉入大水为蜃：雉鸟进入大海化为蛤蜊，古人认为立冬后禽鸟会变成贝类避寒。"
  }
];

// 立冬饮食数据 - 用于饼图展示
const dietData = [
  { name: '饺子', value: 30, color: '#FF6B6B' },
  { name: '羊肉', value: 25, color: '#4ECDC4' },
  { name: '萝卜', value: 20, color: '#FFD166' },
  { name: '栗子', value: 15, color: '#6A0572' },
  { name: '其他', value: 10, color: '#1A535C' },
];

// 互动问答数据
const quizData = [
  {
    question: "立冬是二十四节气中的第几个节气？",
    options: ["第18个", "第19个", "第20个", "第21个"],
    answer: 1 // 第19个
  },
  {
    question: "以下哪个不是立冬的传统习俗？",
    options: ["吃饺子", "补冬", "放鞭炮", "祭祀祖先"],
    answer: 2 // 放鞭炮
  },
  {
    question: "立冬三候中的'雉入大水为蜃'中的'蜃'指的是什么？",
    options: ["蛤蜊", "乌龟", "螃蟹", "鱼"],
    answer: 0 // 蛤蜊
  }
];

const WinterSolsticeCard = ({ title, children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg ${className}`}
  >
    <h3 className="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">{title}</h3>
    {children}
  </motion.div>
);

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-80 md:h-96 w-full overflow-hidden rounded-xl">
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentIndex ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img 
            src={image} 
            alt={`Winter scene ${index + 1}`} 
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const QuizComponent = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(optionIndex);
    const isAnswerCorrect = optionIndex === quizData[currentQuestion].answer;
    setIsCorrect(isAnswerCorrect);
    
    if (isAnswerCorrect) {
      setScore(prevScore => prevScore + 1);
    }
    
    // 延迟显示下一题
    setTimeout(() => {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setShowResults(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="text-center py-8">
        <h3 className="text-2xl font-bold mb-4">测验结果</h3>
        <p className="text-xl mb-6">您答对了 {score} 题，共 {quizData.length} 题</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={restartQuiz}
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-full font-medium transition-all"
        >
          重新开始
        </motion.button>
      </div>
    );
  }

  const currentQuiz = quizData[currentQuestion];

  return (
    <div className="p-4">
      <div className="mb-6">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          问题 {currentQuestion + 1}/{quizData.length}
        </p>
        <h4 className="text-lg font-semibold">{currentQuiz.question}</h4>
      </div>
      
      <div className="space-y-3">
        {currentQuiz.options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={selectedOption === null ? { scale: 1.02 } : {}}
            whileTap={selectedOption === null ? { scale: 0.98 } : {}}
            onClick={() => handleOptionSelect(index)}
            disabled={selectedOption !== null}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              selectedOption === null 
                ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-850' 
                : selectedOption === index 
                  ? isCorrect 
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/30' 
                    : 'border-red-500 bg-red-50 dark:bg-red-900/30' 
                  : index === currentQuiz.answer 
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/30' 
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-850'
            }`}
          >
            {option}
            {selectedOption !== null && (
              <span className="ml-2">
                {index === currentQuiz.answer 
                  ? <i className="fa-solid fa-check text-green-500"></i> 
                  : selectedOption === index && <i className="fa-solid fa-times text-red-500"></i>
                }
              </span>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 pb-16`}>
      {/* 顶部导航栏 */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
          >
            <i className="fa-solid fa-sun"></i> 立冬节气
          </motion.h1>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800"
            >
              {theme === 'light' ? <i className="fa-solid fa-moon"></i> : <i className="fa-solid fa-sun"></i>}
            </motion.button>
            <div className="text-sm hidden md:inline">
              {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容区域 */}
      <main className="container mx-auto px-4 py-8">
        {/* 英雄区域 */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">
              立冬 · 万物收藏
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              立冬是二十四节气中的第十九个节气，表示自此进入了冬季，万物收藏，规避寒冷。
            </p>
          </motion.div>

          <ImageCarousel images={winterImages} />
        </section>

        {/* 节气概览 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600 dark:text-indigo-400">
            <i className="fa-solid fa-calendar-alt"></i> 节气概览
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {historyData.map((item, index) => (
              <WinterSolsticeCard key={index} title={item.title} className="h-full">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{item.content}</p>
              </WinterSolsticeCard>
            ))}
          </div>
        </section>

        {/* 传统习俗 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600 dark:text-indigo-400">
            <i className="fa-solid fa-utensils"></i> 传统习俗
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {customsData.map((custom, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300 text-2xl">
                  <i className={`fa-solid ${custom.icon}`}></i>
                </div>
                <h3 className="text-xl font-bold mb-2">{custom.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{custom.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 饮食文化和诗词 */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 饮食文化 */}
            <WinterSolsticeCard title="饮食文化">
              <div className="mb-6">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  立冬时节，民间有"立冬补冬，补嘴空"的谚语。在这一天，人们会通过饮食来补充营养，增强体质，为抵御冬季的严寒做好准备。
                </p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dietData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {dietData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </WinterSolsticeCard>

            {/* 诗词欣赏 */}
            <WinterSolsticeCard title="诗词欣赏">
              <div className="space-y-6">
                {poemsData.map((poem, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="p-4 border-l-4 border-indigo-500 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 rounded-r-lg"
                  >
                    <h4 className="text-lg font-semibold mb-1">{poem.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">—— {poem.author}</p>
                    <p className="text-gray-700 dark:text-gray-300 italic">{poem.content}</p>
                  </motion.div>
                ))}
              </div>
            </WinterSolsticeCard>
          </div>
        </section>

        {/* 互动问答 */}
        <section className="mb-12">
          <WinterSolsticeCard title="节气知识小测验">
            <QuizComponent />
          </WinterSolsticeCard>
        </section>

        {/* 温馨提示 */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-6 shadow-lg text-center"
          >
            <h3 className="text-2xl font-bold mb-4">立冬养生小贴士</h3>
            <ul className="text-left space-y-3 max-w-2xl mx-auto">
              <li className="flex items-start">
                <i className="fa-solid fa-check-circle mt-1 mr-2"></i>
                <span>早睡晚起，保证充足的睡眠，有利于阳气的潜藏和阴精的积蓄。</span>
              </li>
              <li className="flex items-start">
                <i className="fa-solid fa-check-circle mt-1 mr-2"></i>
                <span>注意保暖，特别是背部、腹部和脚部的保暖。</span>
              </li>
              <li className="flex items-start">
                <i className="fa-solid fa-check-circle mt-1 mr-2"></i>
                <span>适当进行户外运动，但避免过度劳累，以微微出汗为宜。</span>
              </li>
              <li className="flex items-start">
                <i className="fa-solid fa-check-circle mt-1 mr-2"></i>
                <span>饮食上宜温补，多吃富含蛋白质、维生素和易于消化的食物。</span>
              </li>
            </ul>
          </motion.div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-800 dark:bg-gray-950 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">立冬节气文化展示</p>
          <p className="text-gray-400 text-sm">© 2025 中国传统节气文化</p>
        </div>
      </footer>
    </div>
  );
}