import { DEFAULT_LANGUAGE, normalizeLanguage } from "./routes";

const normalizeKey = (value: string) => value.replace(/\s+/g, " ").trim();

const pt = {
  "Construction Engineer | Project Management | QHSE-Quality":
    "Engenheiro de Construção | Gestão de Projetos | QHSE-Qualidade",
  "Hi, my name is ZePedro, and I’m a Construction Engineer with 4+ years in project management and nearly 2 years in QHSE-Quality coordination at Mota-Engil Angola.":
    "Olá, o meu nome é ZePedro e sou Engenheiro de Construção, com mais de 4 anos em gestão de projetos e quase 2 anos em coordenação QHSE-Qualidade na Mota-Engil Angola.",
  "Hi, my name is ZePedro, and I'm a Construction Engineer with 4+ years in project management and nearly 2 years in QHSE-Quality coordination at Mota-Engil Angola.":
    "Olá, o meu nome é ZePedro e sou Engenheiro de Construção, com mais de 4 anos em gestão de projetos e quase 2 anos em coordenação QHSE-Qualidade na Mota-Engil Angola.",
  "AUTONOMOUS PROJECT": "PROJETO AUTÓNOMO",
  "Soyo, Zaire, Angola": "Soyo, Zaire, Angola",
  "Cabinda, Angola": "Cabinda, Angola",
  "Luanda, Angola": "Luanda, Angola",
  "Buildings": "Edifícios",
  "Building": "Edifício",
  "Roads": "Estradas",
  "Road": "Estrada",
  "Bridges": "Pontes",
  "Bridge": "Ponte",
  "Architecture": "Arquitetura",
  "Architectural Projects": "Projetos de Arquitetura",
  "Drainage": "Drenagem",
  "Airport": "Aeroporto",
  "Trainee": "Estágio",
  "3-Story Multifunctional Building": "Edifício Multifuncional de 3 Pisos",
  "Architectural Project - Single-Family Home T5": "Projeto de Arquitetura - Moradia Unifamiliar T5",
  "Construction of 120 Social Apartments in Buco-Zau": "Construção de 120 Apartamentos Sociais no Buco-Zau",
  "Construction of Access Roads to the New Bridge Over the Lucola River":
    "Construção dos Acessos à Nova Ponte sobre o Rio Lucola",
  "Construction of the New Bridge Over the Lucola River": "Construção da Nova Ponte sobre o Rio Lucola",
  "Evolutionary Architectural Project for a Residential Complex with 10 Apartments":
    "Projeto Arquitetónico Evolutivo para Complexo Residencial com 10 Apartamentos",
  "Executive and Structural Project of a T4 Single-Family Home":
    "Projeto Executivo e Estrutural de Moradia Unifamiliar T4",
  "Mamaland Project: Electronic Model of Tchiela Farm": "Projeto Mamaland: Modelo Eletrónico da Fazenda Tchiela",
  "Modification and Renovation Project for Two T1 Residences":
    "Projeto de Modificação e Reabilitação de Duas Residências T1",
  "Ravines in Cabinda Province-Tchizo 1": "Ravinas na Província de Cabinda - Tchizo 1",
  "Rehabilitation of the Maria Mambo Café Airport Pavement Runway":
    "Reabilitação do Pavimento da Pista do Aeroporto Maria Mambo Café",
  "Rehabilitation of the office building on Macau Street":
    "Reabilitação do Edifício de Escritórios na Rua de Macau",
  "Renovation and Expansion of a 2-Story Residence": "Reabilitação e Ampliação de Residência de 2 Pisos",
  "Renovation and Expansion of the 1º de Maio Maternity Hospital":
    "Reabilitação e Ampliação da Maternidade 1º de Maio",
  "Stormwater Drainage System Rehabilitation in Cabinda City":
    "Reabilitação do Sistema de Drenagem de Águas Pluviais na Cidade de Cabinda",
  "Trainee Program STARTME @2021_8th Edition": "Programa de Estágio STARTME @2021_8ª Edição",
  "MOTA-ENGIL CERTIFICATES": "CERTIFICADOS MOTA-ENGIL",
  "Certificates": "Certificados",
  "Other": "Outros",
  "Show Summary": "Mostrar resumo",
  "Hide Summary": "Ocultar resumo",
  "View All Images": "Ver todas as imagens",
  "All Images": "Todas as imagens",
  "No certificates available.": "Nenhum certificado disponível.",
  "Certificate": "Certificado",
  "graduation ceremony": "cerimónia de graduação",
  "Civil Engineering": "Engenharia Civil",
  "Construction Engineering": "Engenharia de Construção",
  "Engineering": "Engenharia",
  "Bachelor": "Licenciatura",
  "Bachelor Degree": "Licenciatura",
  "University": "Universidade",
  "Institute": "Instituto",
  "Polytechnic Institute": "Instituto Politécnico",
  "This architectural project features a multifunctional 3-story building, designed and organized with the following layout:":
    "Este projeto arquitetónico apresenta um edifício multifuncional de 3 pisos, concebido e organizado com a seguinte distribuição:",
  "The single-family home was designed with two floors in the main building, featuring the following layout:":
    "A moradia unifamiliar foi concebida com dois pisos no edifício principal, apresentando a seguinte distribuição:",
  "Deputy Project Management and construction leadership in a large-scale social housing project.":
    "Apoio à gestão de projeto e liderança de construção num projeto habitacional social de grande escala.",
  "Built with a mixed structural solution combining prefabricated slabs (pre-slabs) on steel profiles. I joined the New Bridge project at approximately 70% physical progress and contributed directly to core execution and finishing activities.":
    "Construída com uma solução estrutural mista que combina lajes pré-fabricadas sobre perfis metálicos. Integrei o projeto da Nova Ponte com cerca de 70% de execução física e contribuí diretamente nas atividades de execução e acabamentos.",
  "The project was developed with the ambition of future expansion to approximately 15 apartments, each comprising:":
    "O projeto foi desenvolvido com a ambição de expansão futura para aproximadamente 15 apartamentos, cada um composto por:",
  "The building has the following layout:": "O edifício apresenta a seguinte distribuição:",
  "The electronic model was developed to optimize the layout of facilities for processing harvested cocoa. The project includes the distribution of five main blocks:":
    "O modelo eletrónico foi desenvolvido para otimizar a implantação das instalações de processamento do cacau colhido. O projeto inclui a distribuição de cinco blocos principais:",
  "A high-impact housing delivery project demonstrating measurable progress improvement, leadership scalability, and strong quality/coordination performance.":
    "Um projeto habitacional de alto impacto que demonstra evolução mensurável de progresso, capacidade de liderança escalável e forte desempenho em qualidade e coordenação.",
  "This phase strengthened my execution control in bridge works, combining structural coordination, pavement layers, and slope stabilization with quality and safety focus in a live construction environment.":
    "Esta fase reforçou o meu controlo de execução em obras de pontes, combinando coordenação estrutural, camadas de pavimento e estabilização de taludes com foco em qualidade e segurança num ambiente de obra ativo.",
  "In addition to these blocks, the model includes the expansion of offices, kitchen, sanitary facilities, and other necessary spaces for the proper functioning of the farm.":
    "Além destes blocos, o modelo inclui a ampliação de escritórios, cozinha, instalações sanitárias e outros espaços necessários para o bom funcionamento da fazenda.",
  "This model serves as a visual tool to better understand the proposed interventions, ensuring a more efficient and sustainable urban infrastructure.":
    "Este modelo serve como ferramenta visual para compreender melhor as intervenções propostas, garantindo uma infraestrutura urbana mais eficiente e sustentável.",
  "IT technology and home appliances store": "Loja de tecnologia informática e eletrodomésticos",
  "Office spaces": "Espaços de escritório",
  "Economic nightclub, convertible to a banquet hall": "Discoteca económica, convertível em salão de banquetes",
  "VIP nightclub with an exclusive VIP area, also convertible to a banquet hall":
    "Discoteca VIP com área exclusiva, também convertível em salão de banquetes",
  "An open common room": "Sala comum em espaço aberto",
  "A kitchen": "Cozinha",
  "A bathroom serving the outdoor area": "Casa de banho de apoio à área exterior",
  "A laundry room": "Lavandaria",
  "A storage room": "Arrecadação",
  "A gym": "Ginásio",
  "One bedroom": "Um quarto",
  "A large open room": "Sala ampla em espaço aberto",
  "An office": "Escritório",
  "A library": "Biblioteca",
  "A general bathroom": "Casa de banho geral",
  "Staking out the road section;": "Implantação do trecho rodoviário;",
  "Understanding the functionality of the main equipment for road construction;":
    "Compreensão da funcionalidade dos principais equipamentos de construção rodoviária;",
  "Techniques applied in the building rehabilitation process;":
    "Técnicas aplicadas no processo de reabilitação de edifícios;",
  "As part of the project, I was responsible for the supervision phase, which included: Monitoring the physical execution of the building’s construction, Cost control and Inventory management. The supervision activities spanned a three-month period.":
    "No âmbito do projeto, fui responsável pela fase de fiscalização, que incluiu o acompanhamento da execução física da construção do edifício, controlo de custos e gestão de inventário. As atividades de fiscalização decorreram durante um período de três meses.",
  "I was integrated into the project, which consists of creating an alternative route connecting to Cabassango, crossing the Lucola River, after approximately 50% of the project's physical execution. In this endeavor, I gained knowledge in:":
    "Fui integrado no projeto, que consiste na criação de uma via alternativa de ligação a Cabassango, atravessando o Rio Lucola, quando a execução física se encontrava em cerca de 50%. Neste empreendimento, adquiri conhecimentos em:",
  "This endeavor provided me with the opportunity to strengthen collaborative ties with the Internal Support Services (SAI), which include the laboratory, topography, transportation, metalworking, concrete plant, prefabrication, iron cutting and shaping, electromechanics, and cafeteria. This contributed to the project's success and efficiency, strengthening the bonds among the various teams involved.":
    "Este empreendimento deu-me a oportunidade de fortalecer laços de colaboração com os Serviços de Apoio Interno (SAI), incluindo laboratório, topografia, transportes, serralharia, central de betão, pré-fabricação, corte e moldagem de ferro, eletromecânica e refeitório. Isto contribuiu para o sucesso e eficiência do projeto, reforçando a ligação entre as várias equipas envolvidas.",
  "I served as Deputy Director in this significant Civil Construction project focusing on Buildings. The undertaking involved rehabilitating the main building with four floors and demolishing a two-story support building (annex) for total reconstruction. I gained essential knowledge, including:":
    "Atuei como Diretor Adjunto neste importante projeto de construção civil na área de edifícios. A empreitada envolveu a reabilitação do edifício principal com quatro pisos e a demolição de um edifício de apoio de dois pisos (anexo) para reconstrução total. Adquiri conhecimentos essenciais, incluindo:",
  "The project provided me with a valuable opportunity to establish solid and collaborative contacts with the Internal Support Services, including transportation, metalworking, concrete plant, iron cutting and shaping, electromechanics, and cafeteria.":
    "O projeto proporcionou-me uma oportunidade valiosa para estabelecer contactos sólidos e colaborativos com os Serviços de Apoio Interno, incluindo transportes, serralharia, central de betão, corte e moldagem de ferro, eletromecânica e refeitório.",
  "Throughout the project, I was involved in production, planning, procurement (acquisition of materials and tools/equipment), design (architecture), measurements and budgeting, logistics-warehouse, and as a driver. The project consisted of renovating and expanding the residence, resulting in the addition of:":
    "Ao longo do projeto, estive envolvido na produção, planeamento, aprovisionamento (aquisição de materiais e ferramentas/equipamentos), projeto de arquitetura, medições e orçamentação, logística-armazém e apoio como motorista. O projeto consistiu na reabilitação e ampliação da residência, resultando na adição de:",
  "Each residence comprises a hall, common room, kitchen, bathroom, and bedroom. The activities carried out included:":
    "Cada residência é composta por hall, sala comum, cozinha, casa de banho e quarto. As atividades executadas incluíram:",
  "The project aims to execute a technical landfill using selected soils to facilitate the construction of a drop inspection chamber, collectors, and slope descents. This will enable the redirection of water from collectors and ditches towards a water line, where energy dissipation boxes will be constructed to prevent ongoing soil erosion.":
    "O projeto visa executar um aterro técnico com solos selecionados para viabilizar a construção de uma câmara de queda, coletores e descidas de talude. Isto permitirá redirecionar as águas dos coletores e valas para uma linha de água, onde serão construídas caixas dissipadoras de energia para impedir a continuação da erosão do solo.",
  "The project involved intervention on the runway of the main aerodrome in the province of Cabinda. Aimed at preserving the local economy and meeting the population's needs regarding flight services, the activities were carried out during the nighttime, after the closure of the last service, from midnight to 6 AM. The focus was primarily on the following activities:":
    "O projeto envolveu intervenção na pista do principal aeródromo da província de Cabinda. Com o objetivo de preservar a economia local e responder às necessidades da população em relação aos serviços aéreos, as atividades foram realizadas no período noturno, após o encerramento do último serviço, entre a meia-noite e as 6h. O foco incidiu principalmente nas seguintes atividades:",
  "The main goal of this project was to contribute to the reduction of maternal and infant morbidity and mortality, ensuring childbirth assistance that provides comfort to both the mother and the newborn, as well as postpartum care.":
    "O principal objetivo deste projeto foi contribuir para a redução da morbilidade e mortalidade materno-infantil, garantindo assistência ao parto com conforto para a mãe e o recém-nascido, bem como cuidados pós-parto.",
  "The electronic model was developed to present the conceptual project aimed at improving the city of Cabinda, due to the increasing degradation of urban infrastructure. The project includes:":
    "O modelo eletrónico foi desenvolvido para apresentar o projeto conceptual destinado à melhoria da cidade de Cabinda, face à crescente degradação das infraestruturas urbanas. O projeto inclui:",
  "During the internship period, as a trainee, I had the opportunity to gain knowledge in different sectors and cost centers, namely:":
    "Durante o período de estágio, como trainee, tive a oportunidade de adquirir conhecimentos em diferentes setores e centros de custo, nomeadamente:",
  "Rehabilitation and expansion of the Maternity Hospital of Cabinda, where I served as Deputy Director. I also provided support in quality, measurements, and civil-architecture preparation areas.":
    "Reabilitação e ampliação da Maternidade de Cabinda, onde atuei como Diretor Adjunto. Também prestei apoio nas áreas de qualidade, medições e preparação civil-arquitetónica.",
  "Applied bituminous waterproofing membrane over the binder layer.": "Aplicação de membrana betuminosa de impermeabilização sobre a camada de regularização.",
  "Applied the bituminous concrete wearing course for final pavement performance.": "Aplicação da camada de desgaste em betão betuminoso para o desempenho final do pavimento.",
  "Applying porcelain tile flooring and wall coverings": "Aplicação de pavimento e revestimento cerâmico em porcelanato",
  "Construction of concrete sidewalks;": "Construção de passeios em betão;",
  "Construction of ditches and gutters;": "Construção de valas e sarjetas;",
  "Construction of drains and crossings with culverts;": "Construção de drenos e passagens hidráulicas com manilhas;",
  "Coordinated operations with more than five subcontractors.": "Coordenei operações com mais de cinco subempreiteiros.",
  "Coordination with Internal Support Services (ISS)* for the procurement of services and materials.": "Coordenação com os Serviços de Apoio Interno (SAI)* para aquisição de serviços e materiais.",
  "Creating openings for the installation of a counter": "Abertura de vãos para instalação de um balcão",
  "Delivered slope protection using a mixed containment solution: hydraulic concrete and topsoil with Wedelia planting for erosion control and drainage support.": "Executei proteção de taludes com uma solução mista de contenção: betão hidráulico e terra vegetal com plantação de Wedelia para controlo de erosão e apoio à drenagem.",
  "Development of a Monthly Plan using specialized tools to track progress and ensure timely execution.": "Desenvolvimento de um Plano Mensal com ferramentas especializadas para acompanhar o progresso e garantir a execução dentro dos prazos.",
  "Effective traffic management, including traffic diversions;": "Gestão eficaz do tráfego, incluindo desvios de trânsito;",
  "Effective use of the SAP tool, focusing on procurement, logistics, and warehousing;": "Utilização eficaz da ferramenta SAP, com foco em compras, logística e armazém;",
  "Efficient interaction with suppliers, optimizing procurement and logistics processes;": "Interação eficiente com fornecedores, otimizando os processos de compras e logística;",
  "Executed joint casting operations to ensure deck continuity and structural integrity.": "Executei betonagens de juntas para garantir a continuidade do tabuleiro e a integridade estrutural.",
  "Execution of the base layer with soil-cement (extending more than 1 kilometer and 580 meters);": "Execução da camada de base em solo-cimento, numa extensão superior a 1 quilómetro e 580 metros;",
  "Filling out the internal file for the monthly plan.": "Preenchimento do ficheiro interno do plano mensal.",
  "General Hospital of Cabinda, where I gained experience mainly in the QHSE (Quality, Health, Safety, and Environment) area;": "Hospital Geral de Cabinda, onde adquiri experiência principalmente na área de QHSE (Qualidade, Saúde, Segurança e Ambiente);",
  "Installation of curbs and counter-curbs;": "Instalação de lancis e contra-lancis;",
  "Intervening in the sanitation system (sewage), including cleaning the septic tank": "Intervenção no sistema de saneamento (esgoto), incluindo limpeza da fossa séptica",
  "In six months, increased progress to 62.17% physical and 62.3% financial.": "Em seis meses, o progresso aumentou para 62,17% físico e 62,3% financeiro.",
  "Angola": "Angola",
  "Laboratory - besides laboratory tests, I also interacted with the Breakwater and Port of Cabinda project (conducting Slump tests in situ) and intervention on Rua 57 in Cabaçango (conducting Proctor tests in situ);": "Laboratório - além dos ensaios laboratoriais, também interagi com o projeto do Quebra-Mar e Porto de Cabinda (realização de ensaios Slump in situ) e com a intervenção na Rua 57 em Cabaçango (realização de ensaios Proctor in situ);",
  "Leveling the floors": "Nivelamento dos pavimentos",
  "Managed approximately 300 workers at peak workforce.": "Geri aproximadamente 300 trabalhadores no pico de mão de obra.",
  "Measurements area;": "Área de medições;",
  "Milling to a depth of 5 cm, covering a total length of 600 meters and width of 16 meters;": "Fresagem a uma profundidade de 5 cm, numa extensão total de 600 metros e largura de 16 metros;",
  "Monitored and coordinated the installation of 47 prefabricated pre-slabs, each averaging 14.5 tons, including in-situ casting at both end slabs.": "Acompanhei e coordenei a instalação de 47 pré-lajes pré-fabricadas, com média de 14,5 toneladas cada, incluindo betonagem in situ nas duas lajes de extremidade.",
  "New construction of a party hall (including kitchen and pool).": "Construção nova de salão de festas, incluindo cozinha e piscina.",
  "Preparation of the box bottom and subsequent layers;": "Preparação do fundo de caixa e das camadas subsequentes;",
  "Prepared and implemented slope geometry to improve surrounding terrain stability.": "Preparei e implementei a geometria dos taludes para melhorar a estabilidade do terreno envolvente.",
  "Renewing the general interior paint": "Renovação da pintura geral interior",
  "Repairing the roof to address infiltration issues caused by weather conditions": "Reparação da cobertura para resolver infiltrações causadas pelas condições climáticas",
  "Repositioning the milled layer with asphalt.": "Reposicionamento da camada fresada com asfalto.",
  "Resolving conflicts with the local population.": "Resolução de conflitos com a população local.",
  "Safe and efficient execution of demolitions;": "Execução segura e eficiente das demolições;",
  "Served one year as full-time Project Quality Technician, then promoted to Deputy Project Manager and later appointed Project Director.": "Atuei durante um ano como Técnico de Qualidade de Projeto em tempo integral, depois fui promovido a Gestor de Projeto Adjunto e posteriormente nomeado Diretor de Projeto.",
  "Setting up the construction site and preparing for the groundbreaking ceremony, actively participating in all stages of this process;": "Montagem do estaleiro e preparação para a cerimónia de lançamento da primeira pedra, participando ativamente em todas as etapas do processo;",
  "Took over project at 46% physical progress and 52.8% financial progress.": "Assumi o projeto com 46% de progresso físico e 52,8% de progresso financeiro.",
  "Understanding the functioning of internal debits, optimizing cash flow;": "Compreensão do funcionamento dos débitos internos, otimizando o fluxo de caixa;",
  "Utilization of SAP for various project management tasks, including: requesting materials, approving materials and services, logistic control and approval of working hours.": "Utilização do SAP em várias tarefas de gestão de projeto, incluindo solicitação de materiais, aprovação de materiais e serviços, controlo logístico e aprovação de horas de trabalho.",
  "Additional Responsibilities as required to ensure the smooth operation and completion of the project.": "Responsabilidades adicionais conforme necessário para garantir o bom funcionamento e a conclusão do projeto.",
  "Application of various sanitation methods;": "Aplicação de vários métodos de saneamento;",
  "Average Load": "Carga média",
  "Bagging Area": "Área de ensacamento",
  "Bathroom": "Casa de banho",
  "Bedroom": "Quarto",
  "Bedroom with en-suite bathroom": "Quarto com casa de banho privativa",
  "Buco-Zau, Cabinda, Angola": "Buco-Zau, Cabinda, Angola",
  "CADEL CONSTRUÇÕES": "CADEL CONSTRUÇÕES",
  "Community kitchen": "Cozinha comunitária",
  "Composting Area": "Área de compostagem",
  "Current Progress": "Progresso atual",
  "Curbs": "Lancis",
  "Cutting Area": "Área de corte",
  "Dining room": "Sala de jantar",
  "Ditches and catch basins": "Valas e caixas de captação",
  "Drying Area": "Área de secagem",
  "External bathroom": "Casa de banho exterior",
  "Fermentation Area": "Área de fermentação",
  "Financial Progress": "Progresso financeiro",
  "General bathroom": "Casa de banho geral",
  "General reception area": "Área geral de receção",
  "Gym": "Ginásio",
  "Half bath": "Lavabo",
  "Huambo, Angola": "Huambo, Angola",
  "Kitchen": "Cozinha",
  "Kitchen with pantry": "Cozinha com despensa",
  "Laundry room": "Lavandaria",
  "Living room": "Sala de estar",
  "Luanda": "Luanda",
  "MAMALAND ~ MOTA-ENGIL ANGOLA": "MAMALAND ~ MOTA-ENGIL ANGOLA",
  "MOTA-ENGIL ANGOLA": "MOTA-ENGIL ANGOLA",
  "Manholes": "Caixas de visita",
  "Office + library": "Escritório + biblioteca",
  "Open social area (with barbecue space)": "Área social aberta (com espaço para churrasco)",
  "Parking area": "Área de estacionamento",
  "Peak Workforce": "Pico de mão de obra",
  "Physical Progress": "Progresso físico",
  "Pool (7×3 m)": "Piscina (7×3 m)",
  "Shop": "Loja",
  "Sidewalks": "Passeios",
  "Subcontractors": "Subempreiteiros",
  "Suite with ante-room": "Suíte com antecâmara",
  "Tchizo Neighborhood, Outskirts of Cabinda City, Angola": "Bairro Tchizo, arredores da cidade de Cabinda, Angola",
  "Trees": "Árvores",
  "Two auxiliary staircases for access to the upper floor": "Duas escadas auxiliares de acesso ao piso superior",
  "Two bedrooms": "Dois quartos",
  "Two bedrooms with en-suite bathrooms": "Dois quartos com casas de banho privativas",
  "Urban furniture": "Mobiliário urbano",
  "bathrooms;": "casas de banho;",
  "bedrooms": "quartos",
  "current_progress": "progresso_atual",
  "financial_progress": "progresso_financeiro",
  "peak_workforce": "pico_de_mao_de_obra",
  "physical_progress": "progresso_fisico",
  "subcontractors": "subempreiteiros",
};

const dictionaries = {
  pt,
} as const;

export const translateFirestoreString = (value: string, language: string) => {
  const lang = normalizeLanguage(language);
  if (lang === DEFAULT_LANGUAGE) return value;

  const dictionary = dictionaries[lang as keyof typeof dictionaries];
  if (!dictionary) return value;

  return dictionary[normalizeKey(value) as keyof typeof dictionary] ?? value;
};
