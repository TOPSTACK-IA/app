
const SUPABASE_BASE = 'https://pvlobuvyblzcielydbum.supabase.co/storage/v1/object/public/topstack';

export const ASSETS = {
  logoFull: `${SUPABASE_BASE}/topstack-logo-3x1.png`,
  logoSquare: `${SUPABASE_BASE}/topstack-logo-1x1.png`,
  favicon: `${SUPABASE_BASE}/favicon.svg`,
  faviconCircle: `${SUPABASE_BASE}/topstack-favicon-cf-40x40.png`,
  ogImage: `${SUPABASE_BASE}/topstack-og-image-1200x630-cf.png`
};

export const SCRIPTS = {
  weekly: (url: string) => `
function main() {
  // 1. CONFIGURAÇÕES
  var SPREADSHEET_URL = '${url}';
  
  // 2. CALCULA DATAS (Segunda a Domingo da semana passada)
  var dateRange = getLastWeekRange();
  Logger.log("Rodando rotina semanal. Buscando dados de: " + dateRange.start + " até " + dateRange.end);

  // 3. QUERY GAQL
  var query = 
    "SELECT " +
      "segments.week, " +
      "customer.id, " +                     
      "customer.descriptive_name, " +       
      "campaign.id, " +                     
      "campaign.name, " +                   
      "campaign.status, " +                 
      "campaign.advertising_channel_type, "+
      "campaign.bidding_strategy_type, " +  
      "ad_group.id, " +                     
      "ad_group.name, " +                   
      "ad_group_ad.ad.id, " +               
      "ad_group_ad.ad.name, " +             
      "ad_group_ad.status, " +              
      "metrics.impressions, " +             
      "metrics.clicks, " +                  
      "metrics.ctr, " +                     
      "metrics.interactions, " +            
      "metrics.average_cost, " +            
      "metrics.cost_micros, " +             
      "metrics.conversions, " +             
      "metrics.conversions_from_interactions_rate, " + 
      "metrics.cost_per_conversion " +      
    "FROM " +
      "ad_group_ad " +
    "WHERE " +
      "segments.date BETWEEN '" + dateRange.start + "' AND '" + dateRange.end + "' " + 
      "AND metrics.impressions > 0 " + 
    "ORDER BY " +
      "segments.week ASC, " +
      "metrics.cost_micros DESC";

  var spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  var sheet = spreadsheet.getActiveSheet();
  var report = AdsApp.report(query);
  var rows = report.rows();
  var rowsToAdd = [];
  
  while (rows.hasNext()) {
    var row = rows.next();
    rowsToAdd.push([
      row['segments.week'], row['customer.id'], row['customer.descriptive_name'],
      row['campaign.id'], row['campaign.name'], row['campaign.status'],
      row['campaign.advertising_channel_type'], row['campaign.bidding_strategy_type'],
      row['ad_group.id'], row['ad_group.name'], row['ad_group_ad.ad.id'],
      row['ad_group_ad.ad.name'], row['ad_group_ad.status'], row['metrics.impressions'],
      row['metrics.clicks'], row['metrics.ctr'], row['metrics.interactions'],
      row['metrics.average_cost'], row['metrics.cost_micros'], row['metrics.conversions'],
      row['metrics.conversions_from_interactions_rate'], row['metrics.cost_per_conversion']
    ]);
  }

  if (rowsToAdd.length > 0) {
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow + 1, 1, rowsToAdd.length, rowsToAdd[0].length).setValues(rowsToAdd);
    Logger.log("Sucesso! " + rowsToAdd.length + " linhas adicionadas.");
  }
}

function getLastWeekRange() {
  var today = new Date();
  var timeZone = AdsApp.currentAccount().getTimeZone();
  var dayOfWeek = today.getDay();
  var diffToLastSunday = dayOfWeek === 0 ? 7 : dayOfWeek; 
  var lastSunday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - diffToLastSunday);
  var lastMonday = new Date(lastSunday.getFullYear(), lastSunday.getMonth(), lastSunday.getDate() - 6);
  return {
    start: Utilities.formatDate(lastMonday, timeZone, 'yyyy-MM-dd'),
    end: Utilities.formatDate(lastSunday, timeZone, 'yyyy-MM-dd')
  };
}
`.trim(),
  historical: (url: string) => `
function main() {
  // 1. CONFIGURAÇÕES
  var SPREADSHEET_URL = '${url}';
  
  // 2. QUERY GAQL - DADOS DE JUNHO A DEZEMBRO
  var query = 
    "SELECT " +
      "segments.week, " +
      "customer.id, " +                     
      "customer.descriptive_name, " +       
      "campaign.id, " +                     
      "campaign.name, " +                   
      "campaign.status, " +                 
      "campaign.advertising_channel_type, "+
      "campaign.bidding_strategy_type, " +  
      "ad_group.id, " +                     
      "ad_group.name, " +                   
      "ad_group_ad.ad.id, " +               
      "ad_group_ad.ad.name, " +             
      "ad_group_ad.status, " +              
      "metrics.impressions, " +             
      "metrics.clicks, " +                  
      "metrics.ctr, " +                     
      "metrics.interactions, " +            
      "metrics.average_cost, " +            
      "metrics.cost_micros, " +             
      "metrics.conversions, " +             
      "metrics.conversions_from_interactions_rate, " + 
      "metrics.cost_per_conversion " +      
    "FROM " +
      "ad_group_ad " +
    "WHERE " +
      "segments.date BETWEEN '2025-06-01' AND '2025-12-15' " + 
      "AND metrics.impressions > 0 " + 
    "ORDER BY " +
      "segments.week ASC, " +
      "metrics.cost_micros DESC";

  var spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  var sheet = spreadsheet.getActiveSheet();
  sheet.clear(); 
  sheet.appendRow([
    "Semana", "ID Conta", "Nome Conta", "ID Campanha", "Campanha", "Status Camp.", "Tipo Camp.", 
    "Estratégia", "ID Grupo", "Grupo", "ID Anúncio", "Nome Anúncio", "Status Anúncio",
    "Impressões", "Cliques", "CTR", "Interações", "Custo Médio", "Custo (Micros)", 
    "Conversões", "Taxa Conv.", "Custo/Conv."
  ]);

  var report = AdsApp.report(query);
  var rows = report.rows();
  var rowsToAdd = [];
  while (rows.hasNext()) {
    var row = rows.next();
    rowsToAdd.push([
      row['segments.week'], row['customer.id'], row['customer.descriptive_name'],
      row['campaign.id'], row['campaign.name'], row['campaign.status'],
      row['campaign.advertising_channel_type'], row['campaign.bidding_strategy_type'],
      row['ad_group.id'], row['ad_group.name'], row['ad_group_ad.ad.id'],
      row['ad_group_ad.ad.name'], row['ad_group_ad.status'], row['metrics.impressions'],
      row['metrics.clicks'], row['metrics.ctr'], row['metrics.interactions'],
      row['metrics.average_cost'], row['metrics.cost_micros'], row['metrics.conversions'],
      row['metrics.conversions_from_interactions_rate'], row['metrics.cost_per_conversion']
    ]);
    if (rowsToAdd.length >= 500) {
      var lastRow = sheet.getLastRow();
      sheet.getRange(lastRow + 1, 1, rowsToAdd.length, rowsToAdd[0].length).setValues(rowsToAdd);
      rowsToAdd = [];
    }
  }
  if (rowsToAdd.length > 0) {
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow + 1, 1, rowsToAdd.length, rowsToAdd[0].length).setValues(rowsToAdd);
  }
}
`.trim()
};
