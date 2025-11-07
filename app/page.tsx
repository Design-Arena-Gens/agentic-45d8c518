'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Brain, Target, Users, TrendingUp, Shield, Zap, CheckCircle, AlertTriangle, BookOpen, MessageSquare, LineChart, Award } from 'lucide-react';

type Phase = 'intro' | 'psychology' | 'framework' | 'implementation';

export default function Home() {
  const [currentPhase, setCurrentPhase] = useState<Phase>('intro');
  const [selectedPrinciple, setSelectedPrinciple] = useState<string | null>(null);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const psychologyPrinciples = [
    {
      id: 'loss-aversion',
      name: '損失回避の原理',
      author: 'Kahneman & Tversky (プロスペクト理論)',
      description: '人は利益を得ることよりも、損失を回避することに2倍の心理的価値を置く',
      application: 'AI未導入による機会損失を定量化し、競合他社との差が広がるリスクを強調',
      practicalExample: '「御社の競合A社は既にAI在庫管理システムで発注ミスを70%削減し、年間1,200万円のコスト削減を実現しています。このまま何もしなければ、価格競争力で大きく後れを取る可能性があります」',
      evidence: 'Kahneman, D., & Tversky, A. (1979). Prospect Theory: An Analysis of Decision under Risk. Econometrica, 47(2), 263-291.',
    },
    {
      id: 'cialdini-reciprocity',
      name: '返報性の原理',
      author: 'Robert Cialdini (影響力の武器)',
      description: '人は他者から何かを受け取ると、お返しをしなければならないという心理的義務を感じる',
      application: '無料のAI診断レポート、業界特化の課題分析、競合分析レポートを先に提供',
      practicalExample: '初回面談時に「御社の業界（製造業）における最新のAI活用トレンド分析レポート」と「御社の既存システムとの統合可能性診断（30ページ）」を無償で提供',
      evidence: 'Cialdini, R. B. (2006). Influence: The Psychology of Persuasion. Harper Business.',
    },
    {
      id: 'social-proof',
      name: '社会的証明の原理',
      author: 'Robert Cialdini',
      description: '人は不確実な状況下で、他者の行動を正しい行動の指針とする傾向がある',
      application: '同業種・同規模企業の成功事例を具体的数値とともに提示',
      practicalExample: '「御社と同じ年商5億円規模の食品製造業B社では、AIによる需要予測システム導入後、在庫回転率が2.3倍向上し、廃棄ロスが58%減少しました。導入3ヶ月で月額コンサル費用の回収に成功しています」',
      evidence: 'Cialdini, R. B., & Goldstein, N. J. (2004). Social influence: Compliance and conformity. Annual Review of Psychology, 55, 591-621.',
    },
    {
      id: 'commitment-consistency',
      name: '一貫性の原理',
      author: 'Robert Cialdini',
      description: '人は自分の言動に一貫性を持たせたいという強い心理的欲求を持つ',
      application: '小さな合意から始め、段階的にコミットメントを深めていく',
      practicalExample: '第1段階：「AI活用で業務効率を上げたいですか？」→第2段階：「無料診断を受けてみませんか？」→第3段階：「診断結果を踏まえ、具体的な改善案を検討しませんか？」→契約',
      evidence: 'Cialdini, R. B., Cacioppo, J. T., Bassett, R., & Miller, J. A. (1978). Low-ball procedure for producing compliance. Journal of Personality and Social Psychology, 36(5), 463-476.',
    },
    {
      id: 'scarcity',
      name: '希少性の原理',
      author: 'Robert Cialdini',
      description: '手に入りにくいものほど、その価値が高く認識される',
      application: 'コンサルティング枠の限定性、早期導入のメリットを強調',
      practicalExample: '「現在、質の高いコンサルティング提供のため月3社限定で受付中です。また、今期中の契約で初期分析費用50万円を無料化します。競合の導入が進む前の今が最適なタイミングです」',
      evidence: 'Lynn, M. (1991). Scarcity effects on value: A quantitative review of the commodity theory literature. Psychology & Marketing, 8(1), 43-57.',
    },
    {
      id: 'authority',
      name: '権威の原理',
      author: 'Robert Cialdini / Stanley Milgram',
      description: '人は権威ある専門家や組織の意見を信頼し、従う傾向がある',
      application: '専門資格、実績、データ、研究機関との連携などを提示',
      practicalExample: '「弊社コンサルタントはGoogle Cloud認定資格、AWS認定資格保有者で、東京大学AIラボとの共同研究実績があります。経済産業省のDX推進事業にも採択されています」',
      evidence: 'Milgram, S. (1963). Behavioral Study of Obedience. Journal of Abnormal and Social Psychology, 67(4), 371-378.',
    },
    {
      id: 'endowment-effect',
      name: '保有効果',
      author: 'Richard Thaler',
      description: '人は自分が所有しているものに対して、実際の価値以上の価値を感じる',
      application: '無料トライアル期間を設け、AIツールを実際に使用してもらう',
      practicalExample: '「1ヶ月間、実際の業務データでAIシステムを試用いただけます。御社の環境に最適化されたダッシュボードを構築しますので、既に自社のシステムとして実感いただけます」',
      evidence: 'Thaler, R. (1980). Toward a positive theory of consumer choice. Journal of Economic Behavior & Organization, 1(1), 39-60.',
    },
    {
      id: 'framing-effect',
      name: 'フレーミング効果',
      author: 'Kahneman & Tversky',
      description: '同じ情報でも提示の仕方によって意思決定が変わる',
      application: '投資としてのポジティブフレーミング vs コスト削減効果',
      practicalExample: '「月額20万円のコストではなく、年間で1,500万円の業務効率化リターンが見込める投資です。ROI換算で625%の投資効率となります」',
      evidence: 'Tversky, A., & Kahneman, D. (1981). The framing of decisions and the psychology of choice. Science, 211(4481), 453-458.',
    },
    {
      id: 'anchoring',
      name: 'アンカリング効果',
      author: 'Kahneman & Tversky',
      description: '最初に提示された情報（アンカー）が、その後の判断に影響を与える',
      application: '高額プランを先に提示し、その後に推奨プランを提示',
      practicalExample: '「フルカスタマイズプランは月額80万円ですが、多くの中小企業様には月額20万円のスタンダードプランで十分な効果を実現できます」',
      evidence: 'Tversky, A., & Kahneman, D. (1974). Judgment under Uncertainty: Heuristics and Biases. Science, 185(4157), 1124-1131.',
    },
    {
      id: 'confirmation-bias',
      name: '確証バイアス',
      author: 'Peter Wason',
      description: '人は自分の信念を支持する情報を探し、反対する情報を無視する傾向がある',
      application: '経営者の既存の課題認識に沿った形でAIソリューションを提示',
      practicalExample: '経営者が「人手不足が課題」と認識している場合：「まさにその課題をAIが解決します。AIによる自動化で、3人分の作業を1人で処理可能になった事例があります」',
      evidence: 'Wason, P. C. (1960). On the failure to eliminate hypotheses in a conceptual task. Quarterly Journal of Experimental Psychology, 12(3), 129-140.',
    },
  ];

  const salesFramework = [
    {
      id: 'stage1',
      stage: '第1段階：課題発見期',
      duration: '初回接触〜2週間',
      objective: '潜在的な課題と損失を認識させる',
      psychologyUsed: ['損失回避', '確証バイアス', '権威'],
      actions: [
        '業界特化型の無料診断レポートを提供（返報性）',
        '競合他社のAI導入状況を定量データで提示（社会的証明）',
        '現状維持によるコスト試算を提示（損失回避）',
        '経営者の課題認識に共感し、AIでの解決可能性を示唆（確証バイアス）',
      ],
      deliverables: ['業界AI導入トレンドレポート', '競合分析レポート', '機会損失試算シート'],
      keyMetrics: '面談獲得率: 70%以上',
    },
    {
      id: 'stage2',
      stage: '第2段階：価値提示期',
      duration: '2週間〜4週間',
      objective: 'AI導入の具体的価値と実現可能性を示す',
      psychologyUsed: ['社会的証明', 'フレーミング効果', 'アンカリング'],
      actions: [
        '同業種・同規模の成功事例を3件以上提示（社会的証明）',
        'ROI試算を「コスト」ではなく「投資リターン」でフレーミング',
        '高額プランを先に提示後、推奨プランを提案（アンカリング）',
        '無料PoC（概念実証）の提案（保有効果への布石）',
      ],
      deliverables: ['カスタムROI試算書', '実装ロードマップ', '成功事例集'],
      keyMetrics: 'PoC承認率: 50%以上',
    },
    {
      id: 'stage3',
      stage: '第3段階：体験・実証期',
      duration: '4週間〜8週間',
      objective: '実際の効果を体験させ、保有効果を生み出す',
      psychologyUsed: ['保有効果', '一貫性の原理', 'サンクコスト効果'],
      actions: [
        '実データを使った1ヶ月間のPoC実施（保有効果）',
        '週次レビューで小さな成功を積み重ね、コミットメントを深化（一貫性）',
        '社内関係者を巻き込み、組織的コミットメントを形成',
        'PoC成果を経営陣向けレポートにまとめ、投資判断を促進',
      ],
      deliverables: ['PoC成果レポート', '効果測定ダッシュボード', '本導入提案書'],
      keyMetrics: '本契約転換率: 60%以上',
    },
    {
      id: 'stage4',
      stage: '第4段階：契約獲得期',
      duration: '8週間〜12週間',
      objective: '契約を締結し、長期関係を構築',
      psychologyUsed: ['希少性', '損失回避', '権威'],
      actions: [
        'PoC結果を基に、具体的な導入効果を数値で提示',
        '限定的なプロモーション条件を提示（希少性）',
        '競合が先行した場合のリスクを再強調（損失回避）',
        '導入後のサポート体制と専門家チームを提示（権威・安心感）',
      ],
      deliverables: ['最終提案書', '契約書', 'キックオフ資料'],
      keyMetrics: '契約成約率: 40%以上（全体プロセス通算）',
    },
    {
      id: 'stage5',
      stage: '第5段階：価値実現期',
      duration: '契約後3ヶ月〜',
      objective: '継続契約と追加案件を獲得',
      psychologyUsed: ['一貫性の原理', '返報性', '社会的証明'],
      actions: [
        '月次レビューで成果を可視化し、投資判断の正しさを再確認（一貫性）',
        '想定以上の価値提供で、追加相談を引き出す（返報性）',
        '成功事例として他社への紹介を依頼（社会的証明の創出）',
        '新たな課題領域へのAI適用提案で契約拡大',
      ],
      deliverables: ['月次成果レポート', '改善提案書', '追加提案書'],
      keyMetrics: '継続率: 85%以上、アップセル率: 30%以上',
    },
  ];

  const implementationGuide = {
    targetProfile: {
      company: '従業員20〜200名の地方中小企業',
      industry: '製造業、卸売業、小売業、サービス業',
      characteristics: [
        'AI/ITリテラシーが低い',
        '経営者が意思決定権を持つ',
        '投資判断は慎重（コスト意識が高い）',
        '人手不足・業務効率化が課題',
        '競合との差別化を模索',
      ],
    },
    pricing: {
      model: '月額制サブスクリプション',
      tiers: [
        { name: 'ライトプラン', price: '20万円/月', description: '月2回のコンサルティング、既存AIツール活用支援' },
        { name: 'スタンダードプラン', price: '35万円/月', description: '月4回のコンサルティング、複数AIツール統合' },
        { name: 'プレミアムプラン', price: '50万円/月', description: '週1回のコンサルティング、カスタムAIソリューション構築支援' },
      ],
      initialFee: 'PoC実施後は初期費用無料（通常30万円）',
    },
    toolsOffering: [
      { category: '業務自動化', examples: 'ChatGPT API、Claude API、Google Gemini（文書作成、メール対応、データ抽出）' },
      { category: '需要予測・在庫最適化', examples: 'Google Cloud AI、AWS Forecast（売上予測、在庫管理）' },
      { category: '画像認識・品質管理', examples: 'Google Cloud Vision、AWS Rekognition（不良品検知、外観検査）' },
      { category: 'データ分析・可視化', examples: 'Looker Studio、Power BI + Azure AI（経営ダッシュボード）' },
      { category: '顧客対応自動化', examples: 'Dialogflow、Azure Bot Service（チャットボット、FAQ自動応答）' },
      { category: 'マーケティング最適化', examples: 'Google Analytics + AI、Meta Advantage（広告最適化、顧客分析）' },
    ],
    successMetrics: [
      '初回面談獲得率: 60%以上',
      'PoC実施率: 50%以上',
      '契約転換率: 40%以上',
      '平均契約単価: 30万円/月',
      '年間解約率: 15%以下',
      '顧客LTV: 360万円（30万円×12ヶ月）',
    ],
  };

  const practicalScripts = [
    {
      situation: '初回アプローチ（電話・メール）',
      script: `「〇〇社の△△様、初めまして。AI業務効率化の専門コンサルタントの××と申します。

突然のご連絡失礼いたします。実は、御社と同じ【業界】の企業様で、AIを活用して【具体的成果：例「在庫管理の精度を40%向上させ、年間800万円のコスト削減を実現した」】事例がございまして、御社でも同様の成果が期待できるのではないかと思い、ご連絡いたしました。

【業界名】業界に特化したAI活用トレンド分析レポートを作成しておりまして、御社の現状分析も含め、15分ほどお話しさせていただくことは可能でしょうか？もちろん費用は一切かかりません」`,
      psychologyUsed: ['社会的証明', '返報性（無料提供）', '希少性（業界特化）'],
    },
    {
      situation: '初回面談（課題ヒアリング）',
      script: `「本日はお時間いただきありがとうございます。

まず、御社のような【規模・業種】の企業様が現在直面されている課題として、私どもがよく耳にするのは以下のような点です：
- 人手不足で業務が回らない
- ベテラン社員のノウハウが属人化している
- 競合との価格競争が激化している

△△様の感覚として、御社で最も優先度の高い課題は何でしょうか？

【経営者の回答を傾聴】

なるほど、【課題】が最大の懸念事項なのですね。実は、御社と同規模の【同業他社名】様も全く同じ課題を抱えておられました。現在、AIを活用した【ソリューション】で、【具体的成果】を実現されています。

現状のまま何も対策を取らない場合、今後3年間で【損失額試算】程度の機会損失が発生する可能性があります。一方、同業他社様は既にAI活用を開始しており、このギャップは今後さらに広がっていくことが予想されます」`,
      psychologyUsed: ['確証バイアス', '社会的証明', '損失回避', 'フレーミング効果'],
    },
    {
      situation: 'PoC提案（無料トライアル）',
      script: `「△△様、これまでのお話を踏まえまして、御社に最適なAIソリューションのイメージが固まってまいりました。

ただ、『本当に効果が出るのか』というご懸念もあるかと思います。そこで提案なのですが、まずは1ヶ月間、実際の御社のデータを使って効果検証を行いませんか？

具体的には：
- 御社の過去3年分の【データ種類】を分析
- AIモデルを構築し、実際に【業務プロセス】に組み込み
- 毎週、改善効果をレポート

この1ヶ月間は完全無料で実施いたします。効果を実感いただけた場合のみ、本格導入をご検討いただければと思います。

現在、質の高いコンサルティング提供のため月3社限定で受け付けておりまして、今月はあと1枠のみ空きがございます。御社の繁忙期前の今が、最適なタイミングかと思いますが、いかがでしょうか？」`,
      psychologyUsed: ['保有効果（実際に使わせる）', '希少性', '返報性', 'リスク回避'],
    },
    {
      situation: '契約クロージング',
      script: `「1ヶ月間のPoC、お疲れ様でした。結果をまとめますと：

【成果1】：【具体的数値】達成
【成果2】：【具体的数値】達成
【成果3】：【具体的数値】達成

この結果を年間換算しますと、【ROI数値】の投資リターンが見込めます。

本格導入プランとしては3つご用意しておりますが、多くの企業様はスタンダードプラン（月額35万円）からスタートされています。年間420万円の投資で、【ROI換算】万円のリターンが期待できますので、実質的な投資回収期間は【ヶ月】となります。

今月末までにご契約いただける場合、通常30万円の初期費用を無料とさせていただきます。また、競合の【社名】様も同様の提案を検討されているとの情報もあり、このタイミングでのご決断をお勧めいたします。

いかがでしょうか？」`,
      psychologyUsed: ['アンカリング', 'フレーミング（投資リターン）', '希少性', '損失回避', '社会的証明'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Brain className="text-blue-600" size={36} />
            AIコンサルティング営業フレームワーク
          </h1>
          <p className="mt-2 text-gray-600">心理学とエビデンスに基づく、中小企業向けAI導入支援の実践的アプローチ</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1">
            {[
              { id: 'intro', label: '概要', icon: BookOpen },
              { id: 'psychology', label: '心理学原理', icon: Brain },
              { id: 'framework', label: '営業プロセス', icon: Target },
              { id: 'implementation', label: '実践ガイド', icon: Zap },
            ].map((phase) => (
              <button
                key={phase.id}
                onClick={() => setCurrentPhase(phase.id as Phase)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${
                  currentPhase === phase.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <phase.icon size={20} />
                {phase.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {/* Intro Phase */}
          {currentPhase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Target className="text-blue-600" size={28} />
                  このフレームワークの目的
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                  <p className="text-lg leading-relaxed">
                    本フレームワークは、<strong>AI導入経験のない地方中小企業</strong>に対して、
                    <strong className="text-blue-600">月額20万円以上のAIコンサルティング契約</strong>を
                    獲得するための、<strong>心理学的エビデンスに基づいた実践的営業プロセス</strong>を提供します。
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6">
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <AlertTriangle className="text-blue-600" size={20} />
                      中小企業のAI導入における3大障壁
                    </h3>
                    <ul className="space-y-2 text-gray-800">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">1.</span>
                        <span><strong>理解不足</strong>：AIで何ができるか具体的にイメージできない</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">2.</span>
                        <span><strong>コスト不安</strong>：投資対効果が不明確で、失敗を恐れる</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">3.</span>
                        <span><strong>変革抵抗</strong>：現状維持バイアスが強く、新技術導入に消極的</span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-lg leading-relaxed">
                    これらの障壁を乗り越えるため、Kahneman、Cialdini、Thalerら世界的心理学者・行動経済学者の
                    研究成果に基づいた<strong>10の心理学原理</strong>と、それを実践する<strong>5段階の営業プロセス</strong>を
                    体系化しました。
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-8 text-white">
                  <Users className="mb-4" size={40} />
                  <h3 className="text-xl font-bold mb-3">対象企業プロファイル</h3>
                  <ul className="space-y-2 text-blue-50">
                    <li>• 従業員20〜200名の中小企業</li>
                    <li>• 製造業、卸売業、小売業、サービス業</li>
                    <li>• AI/ITリテラシーが低い</li>
                    <li>• 人手不足・業務効率化が課題</li>
                    <li>• 経営者が意思決定権を持つ</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-8 text-white">
                  <TrendingUp className="mb-4" size={40} />
                  <h3 className="text-xl font-bold mb-3">期待される成果</h3>
                  <ul className="space-y-2 text-purple-50">
                    <li>• 初回面談獲得率：60%以上</li>
                    <li>• PoC実施率：50%以上</li>
                    <li>• 契約転換率：40%以上</li>
                    <li>• 平均契約単価：30万円/月</li>
                    <li>• 顧客LTV：360万円（12ヶ月）</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Shield className="text-green-600" size={24} />
                  提供するAIコンサルティングサービスの内容
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">既存AIツール活用支援</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• ChatGPT、Claude等のLLM活用</li>
                      <li>• Google Cloud AI / AWS AI サービス</li>
                      <li>• 業務自動化ツールの統合</li>
                      <li>• データ分析・可視化ツール</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">コンサルティング内容</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• 課題分析と最適AIツール選定</li>
                      <li>• 複数AIモデルの組み合わせ設計</li>
                      <li>• 既存システムとの統合支援</li>
                      <li>• ROI測定と継続的改善</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="text-green-600" size={24} />
                  このフレームワークの特徴
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-2">エビデンスベース</h4>
                    <p className="text-sm text-gray-600">Kahneman、Cialdini等、ノーベル賞受賞者を含む世界的研究者の理論を実践応用</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-2">実践的スクリプト</h4>
                    <p className="text-sm text-gray-600">各営業段階で使える具体的トークスクリプトと心理技法を提供</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-2">段階的プロセス</h4>
                    <p className="text-sm text-gray-600">5段階の営業プロセスで、信頼構築から契約まで体系的にガイド</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Psychology Phase */}
          {currentPhase === 'psychology' && (
            <motion.div
              key="psychology"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Brain className="text-blue-600" size={28} />
                  エビデンスに基づく10の心理学原理
                </h2>
                <p className="text-gray-600 mb-6">
                  各原理をクリックすると、詳細な説明と実践的な活用方法が表示されます。
                </p>
              </div>

              <div className="grid gap-4">
                {psychologyPrinciples.map((principle, index) => (
                  <motion.div
                    key={principle.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <button
                      onClick={() => setSelectedPrinciple(selectedPrinciple === principle.id ? null : principle.id)}
                      className="w-full text-left bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border border-gray-200 hover:border-blue-300"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm">
                              {index + 1}
                            </span>
                            <h3 className="text-xl font-bold text-gray-900">{principle.name}</h3>
                          </div>
                          <p className="text-sm text-gray-600 ml-11">{principle.author}</p>
                        </div>
                        <ChevronRight
                          className={`text-gray-400 transition-transform flex-shrink-0 ${
                            selectedPrinciple === principle.id ? 'rotate-90' : ''
                          }`}
                          size={24}
                        />
                      </div>
                    </button>

                    <AnimatePresence>
                      {selectedPrinciple === principle.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-b-xl p-6 mt-2 ml-4 mr-4 space-y-4">
                            <div>
                              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                <BookOpen size={18} className="text-blue-600" />
                                理論の説明
                              </h4>
                              <p className="text-gray-700">{principle.description}</p>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                <Target size={18} className="text-green-600" />
                                AIコンサル営業への応用
                              </h4>
                              <p className="text-gray-700">{principle.application}</p>
                            </div>
                            <div className="bg-white rounded-lg p-4 border border-blue-200">
                              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                <MessageSquare size={18} className="text-purple-600" />
                                実践例（トークスクリプト）
                              </h4>
                              <p className="text-gray-700 italic">&quot;{principle.practicalExample}&quot;</p>
                            </div>
                            <div className="bg-gray-100 rounded-lg p-4">
                              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                <Award size={18} className="text-yellow-600" />
                                学術的エビデンス
                              </h4>
                              <p className="text-sm text-gray-600">{principle.evidence}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 border border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">心理学原理の統合的活用</h3>
                <p className="text-gray-700 mb-4">
                  これら10の心理学原理は、単独ではなく<strong>組み合わせて使用</strong>することで、
                  より強力な説得効果を発揮します。次の「営業プロセス」タブでは、
                  各段階でどの原理をどのように組み合わせるかを具体的に解説します。
                </p>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-3">効果的な組み合わせ例</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• <strong>初回接触</strong>：返報性（無料診断）+ 社会的証明（他社事例）+ 権威（専門性）</li>
                    <li>• <strong>提案段階</strong>：損失回避（機会損失強調）+ アンカリング（高額プラン先提示）+ フレーミング（投資視点）</li>
                    <li>• <strong>PoC段階</strong>：保有効果（実際に使わせる）+ 一貫性の原理（小さなコミットメント）</li>
                    <li>• <strong>クロージング</strong>：希少性（限定条件）+ 損失回避（競合リスク）+ 社会的証明（導入企業増加）</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* Framework Phase */}
          {currentPhase === 'framework' && (
            <motion.div
              key="framework"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Target className="text-blue-600" size={28} />
                  5段階営業プロセスフレームワーク
                </h2>
                <p className="text-gray-600 mb-6">
                  初回接触から契約獲得、そして継続的な関係構築まで、心理学に基づいた体系的プロセスです。
                </p>
              </div>

              <div className="space-y-4">
                {salesFramework.map((stage, index) => (
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
                      className="w-full text-left bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border-2 border-gray-200 hover:border-blue-400"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold text-lg shadow-lg">
                              {index + 1}
                            </span>
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">{stage.stage}</h3>
                              <p className="text-sm text-gray-600">{stage.duration}</p>
                            </div>
                          </div>
                          <p className="text-gray-700 ml-16 mb-3"><strong>目的：</strong>{stage.objective}</p>
                          <div className="ml-16 flex flex-wrap gap-2">
                            {stage.psychologyUsed.map((psych) => (
                              <span
                                key={psych}
                                className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                              >
                                {psych}
                              </span>
                            ))}
                          </div>
                        </div>
                        <ChevronRight
                          className={`text-gray-400 transition-transform flex-shrink-0 ${
                            selectedStage === stage.id ? 'rotate-90' : ''
                          }`}
                          size={24}
                        />
                      </div>
                    </button>

                    <AnimatePresence>
                      {selectedStage === stage.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-600 rounded-b-xl p-6 mt-2 ml-4 mr-4 space-y-6">
                            <div>
                              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <CheckCircle size={20} className="text-green-600" />
                                実施すべきアクション
                              </h4>
                              <ul className="space-y-2">
                                {stage.actions.map((action, idx) => (
                                  <li key={idx} className="flex items-start gap-3 text-gray-700">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white text-xs font-bold flex-shrink-0 mt-0.5">
                                      {idx + 1}
                                    </span>
                                    <span>{action}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-white rounded-lg p-4 border border-blue-200">
                                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                  <BookOpen size={18} className="text-blue-600" />
                                  提供物・成果物
                                </h4>
                                <ul className="space-y-1">
                                  {stage.deliverables.map((deliverable, idx) => (
                                    <li key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                                      <span className="text-blue-600">✓</span>
                                      {deliverable}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="bg-white rounded-lg p-4 border border-purple-200">
                                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                  <LineChart size={18} className="text-purple-600" />
                                  目標KPI
                                </h4>
                                <p className="text-sm text-gray-700 font-medium">{stage.keyMetrics}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <MessageSquare className="text-blue-600" size={24} />
                  実践的トークスクリプト集
                </h3>
                <div className="space-y-6">
                  {practicalScripts.map((script, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
                        <h4 className="font-bold text-lg">{script.situation}</h4>
                      </div>
                      <div className="p-6 bg-gray-50">
                        <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                          <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800 leading-relaxed">
                            {script.script}
                          </pre>
                        </div>
                        <div>
                          <h5 className="font-bold text-gray-900 mb-2 text-sm">活用している心理学原理：</h5>
                          <div className="flex flex-wrap gap-2">
                            {script.psychologyUsed.map((psych, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full"
                              >
                                {psych}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Implementation Phase */}
          {currentPhase === 'implementation' && (
            <motion.div
              key="implementation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Zap className="text-blue-600" size={28} />
                  実践導入ガイド
                </h2>
                <p className="text-gray-600">
                  このフレームワークを実際のビジネスで活用するための具体的な情報です。
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Users className="text-blue-600" size={24} />
                  ターゲット企業プロファイル
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">企業属性</h4>
                    <p className="text-gray-700 mb-2"><strong>規模：</strong>{implementationGuide.targetProfile.company}</p>
                    <p className="text-gray-700 mb-2"><strong>業種：</strong>{implementationGuide.targetProfile.industry}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">企業特性</h4>
                    <ul className="space-y-2">
                      {implementationGuide.targetProfile.characteristics.map((char, idx) => (
                        <li key={idx} className="text-gray-700 flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>{char}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-lg p-8 border border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="text-green-600" size={24} />
                  価格設定とビジネスモデル
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">料金プラン</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      {implementationGuide.pricing.tiers.map((tier, idx) => (
                        <div
                          key={idx}
                          className={`bg-white rounded-lg p-6 border-2 ${
                            idx === 1 ? 'border-blue-600 shadow-lg scale-105' : 'border-gray-200'
                          }`}
                        >
                          {idx === 1 && (
                            <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full mb-2">
                              推奨プラン
                            </span>
                          )}
                          <h5 className="font-bold text-gray-900 text-lg mb-2">{tier.name}</h5>
                          <p className="text-3xl font-bold text-blue-600 mb-3">{tier.price}</p>
                          <p className="text-sm text-gray-600">{tier.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <p className="text-gray-700"><strong>初期費用：</strong>{implementationGuide.pricing.initialFee}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      ※アンカリング効果を活用：高額プランを先に提示し、スタンダードプランを「お得」に見せる戦略
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Zap className="text-purple-600" size={24} />
                  提供するAIツール・ソリューション例
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {implementationGuide.toolsOffering.map((tool, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
                      <h4 className="font-bold text-gray-900 mb-2">{tool.category}</h4>
                      <p className="text-sm text-gray-700">{tool.examples}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="font-bold text-gray-900 mb-2">コンサルティングの価値提供ポイント</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• <strong>既存AIツール</strong>を組み合わせるため、開発コストが不要</li>
                    <li>• クライアントの<strong>業務課題に最適なAIツール選定</strong>と統合設計が付加価値</li>
                    <li>• 複数AIモデルの<strong>オーケストレーション</strong>により、単体ツール以上の効果を実現</li>
                    <li>• 継続的な<strong>効果測定と改善提案</strong>でサブスクリプション型の価値を提供</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <LineChart size={24} />
                  期待される営業成果KPI
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {implementationGuide.successMetrics.map((metric, idx) => (
                    <div key={idx} className="bg-white bg-opacity-20 backdrop-blur rounded-lg p-4">
                      <p className="font-medium">{metric}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-white bg-opacity-20 backdrop-blur rounded-lg p-4">
                  <h4 className="font-bold mb-2">収益シミュレーション例</h4>
                  <p className="text-sm mb-2">月10社へのアプローチを想定：</p>
                  <ul className="text-sm space-y-1">
                    <li>• 初回面談獲得：6社（60%）</li>
                    <li>• PoC実施：3社（50%）</li>
                    <li>• 契約成約：1.2社（40%）</li>
                    <li>• 平均契約単価：30万円/月</li>
                    <li>• <strong>月次売上：36万円 → 年間売上：432万円（1営業担当あたり）</strong></li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <CheckCircle className="text-green-600" size={24} />
                  成功のための重要ポイント
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-600 bg-green-50 p-4">
                    <h4 className="font-bold text-gray-900 mb-2">1. 「教育」よりも「体験」を重視</h4>
                    <p className="text-sm text-gray-700">
                      AIの理論を説明するよりも、無料診断やPoCで実際の効果を体験させることで、
                      保有効果を発動させ契約率を高める。
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-600 bg-blue-50 p-4">
                    <h4 className="font-bold text-gray-900 mb-2">2. 損失回避を最大限活用</h4>
                    <p className="text-sm text-gray-700">
                      「AIで何ができるか」よりも「AI未導入で何を失うか」を強調。
                      競合との差、機会損失、業界トレンドから取り残されるリスクを定量化。
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-600 bg-purple-50 p-4">
                    <h4 className="font-bold text-gray-900 mb-2">3. 小さなコミットメントから始める</h4>
                    <p className="text-sm text-gray-700">
                      いきなり契約を迫るのではなく、「無料レポート受け取り」→「診断実施」→「PoC」と
                      段階的にコミットメントを深める一貫性の原理を活用。
                    </p>
                  </div>
                  <div className="border-l-4 border-yellow-600 bg-yellow-50 p-4">
                    <h4 className="font-bold text-gray-900 mb-2">4. 社会的証明を具体的に提示</h4>
                    <p className="text-sm text-gray-700">
                      「多くの企業が導入」ではなく、「同業種、同規模のA社が導入後3ヶ月で〇〇円のコスト削減」と
                      具体的数値と詳細事例で信頼性を高める。
                    </p>
                  </div>
                  <div className="border-l-4 border-red-600 bg-red-50 p-4">
                    <h4 className="font-bold text-gray-900 mb-2">5. 権威と専門性を確立</h4>
                    <p className="text-sm text-gray-700">
                      資格、実績、データ、研究機関との連携など、客観的な権威の証拠を提示。
                      「私の経験では」ではなく「データによれば」「〇〇大学の研究では」と裏付けを示す。
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="text-blue-600" size={24} />
                  このフレームワークの理論的基盤
                </h3>
                <p className="text-gray-700 mb-4">
                  本フレームワークは、以下の世界的権威による研究成果に基づいて構築されています：
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">行動経済学</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Daniel Kahneman（ノーベル経済学賞受賞）</li>
                      <li>• Amos Tversky</li>
                      <li>• Richard Thaler（ノーベル経済学賞受賞）</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">社会心理学</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Robert Cialdini</li>
                      <li>• Stanley Milgram</li>
                      <li>• Peter Wason</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              <strong>AIコンサルティング営業フレームワーク</strong>
            </p>
            <p className="text-sm">
              心理学とエビデンスに基づく、中小企業向けAI導入支援の実践的アプローチ
            </p>
            <p className="text-xs mt-4 text-gray-500">
              本フレームワークは学術研究に基づいていますが、実際の営業活動における成果を保証するものではありません。
              各企業の状況に応じて適切にカスタマイズしてご活用ください。
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
