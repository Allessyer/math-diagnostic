export function feedbackPayload(comment, answers, scores) {
  return {comment:comment.trim(),question_count:answers.length,topic_scores:Object.fromEntries(Object.entries(scores).map(([key,value])=>[key,value.score])),app_version:'1.1.0'};
}
export async function sendFeedback({url,key,payload,fetcher=fetch}) {
  if(!payload.comment)return{skipped:true};
  if(!url||!key)throw new Error('not_configured');
  const response=await fetcher(`${url.replace(/\/$/,'')}/rest/v1/feedback`,{method:'POST',headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify(payload)});
  if(!response.ok)throw new Error(`submit_failed_${response.status}`);
  return{skipped:false};
}
