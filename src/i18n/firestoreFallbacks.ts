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
