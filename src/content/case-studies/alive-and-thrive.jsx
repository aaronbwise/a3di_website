import CaseStudySection from '../../components/case-study/CaseStudySection'
import MermaidDiagram from '../../components/case-study/MermaidDiagram'
import CodeBlock from '../../components/case-study/CodeBlock'
import TakeawayBox from '../../components/case-study/TakeawayBox'

const pipelineChart = `flowchart LR
    A["Raw SPSS<br/>survey files"] --> B["JSON config<br/>(per country-year)"]
    B --> C["Ingest &<br/>standardise"]
    C --> D["Merge household<br/>& individual records"]
    D --> E["Compute MCHN<br/>indicators"]
    E --> F["Disaggregated<br/>tabulations"]
    E --> G["Weighted logistic<br/>regression"]
    F --> H["Equity profiles<br/>& presentations"]
    G --> H`

const configCode = `{
  "country": "VNM",
  "survey_year": 2021,
  "survey_type": "MICS",
  "indicators": {
    "excl_bf": "BD2",
    "cont_bf": "BD3",
    "mdd_ch": ["food_grp_1", "food_grp_2", "food_grp_3"],
    "mmf_ch": "BD7",
    "mad_ch": ["mdd_ch", "mmf_ch"]
  },
  "equity_stratifiers": {
    "wealth_q": "windex5",
    "region": "HH7",
    "residence": "HH6",
    "eth_hoh": "ethnicity",
    "mother_edu": "welevel"
  }
}`

export default function AliveAndThriveContent() {
  return (
    <>
      <CaseStudySection title="Challenge">
        <p className="text-[0.95rem] leading-[1.7]">
          Alive &amp; Thrive needed to understand how maternal and child health and nutrition
          outcomes had changed over two decades across Cambodia, Lao PDR, and Viet Nam, and
          critically, whether progress was reaching the most vulnerable populations.
        </p>
        <p className="text-[0.95rem] leading-[1.7]">
          National averages can mask deep disparities: improvements in antenatal care,
          breastfeeding, or dietary diversity at the country level may not reflect the reality for
          ethnic minorities, rural communities, or the poorest households. With funding from the
          Government of Ireland, A&amp;T wanted an evidence base to inform targeted programming,
          policy advocacy, and donor engagement across the Mekong Sub-Region. But the data sat in
          dozens of separate survey files, collected using different instruments and variable
          definitions over more than 20 years.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Approach">
        <p className="text-[0.95rem] leading-[1.7]">
          A3DI designed and built a reproducible, configuration-driven analysis pipeline in Python
          to harmonize data from 15+ rounds of MICS and DHS surveys across the three countries.
        </p>

        <MermaidDiagram chart={pipelineChart} />

        <p className="text-[0.95rem] leading-[1.7]">
          Each country-year combination required its own mapping of raw survey variables to
          standardised indicator definitions. These mappings were managed through JSON configuration
          files rather than hardcoded logic, so the same codebase could process Viet Nam&apos;s 2000
          MICS and Cambodia&apos;s 2021 DHS without modification.
        </p>

        <CodeBlock
          filename="config/vnm_2021_children.json"
          code={configCode}
        />

        <p className="text-[0.95rem] leading-[1.7]">
          The pipeline handled the full analytical workflow: reading raw SPSS survey files, merging
          household and individual records, creating unique identifiers to link mothers and children
          across datasets, and computing standard MCHN indicators spanning both health service
          delivery (antenatal care, institutional delivery, postnatal care) and infant and young
          child feeding practices (exclusive breastfeeding, minimum dietary diversity, minimum
          acceptable diet, and others). All statistics were properly weighted to account for the
          complex survey designs.
        </p>
        <p className="text-[0.95rem] leading-[1.7]">
          With cleaned, combined datasets in hand, A3DI produced disaggregated frequency tabulations
          and weighted logistic regression models examining each indicator by wealth quintile,
          geographic region, urban/rural residence, ethnicity of household head, and mother&apos;s
          education level, across every available survey year. This revealed not just current gaps,
          but how those gaps had evolved over time.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Result">
        <p className="text-[0.95rem] leading-[1.7]">
          The analysis produced a comprehensive equity profile for each country, revealing that
          while overall MCHN indicators had improved, progress was deeply uneven. Wealth-driven
          disparities persisted across most indicators, and in some cases the poorest households
          were beginning to catch up, but from a very low base. Access to health services like
          antenatal care and institutional delivery had expanded substantially, but the quality of
          care within those services showed far less improvement.
        </p>
        <p className="text-[0.95rem] leading-[1.7]">
          Regional and ethnic disparities remained substantial, particularly in Lao PDR where gaps
          in breastfeeding and dietary diversity between ethnic groups exceeded 35 percentage
          points.
        </p>
        <p className="text-[0.95rem] leading-[1.7]">
          A&amp;T used the findings to inform country-level strategies, advocacy with government
          partners and donors, and as inputs for knowledge products shared across the region. The
          configuration-driven approach meant the pipeline could be extended to additional countries
          or updated with new survey rounds without rebuilding the analysis from scratch. A reusable
          asset rather than a one-off deliverable.
        </p>
      </CaseStudySection>

      <TakeawayBox>
        <h2 className="font-bold text-[1.3rem] mb-3">Key Takeaway</h2>
        <p className="text-[0.95rem] leading-[1.7]">
          When national averages show progress, disaggregated analysis is the only way to know
          whether that progress is reaching the people who need it most. Building a reproducible
          pipeline to do that analysis is what turns a one-time project into a lasting
          capability.
        </p>
      </TakeawayBox>
    </>
  )
}
