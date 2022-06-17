import "./Book.css";
import Grid from '@mui/material/Grid';

const Book = (articles) => {
  const { abstract, lead_paragraph, pub_date, _id} = articles.book;
  return (
    <Grid spacing={4} xs={3} md={6} sx={{ maxWidth: 850}}>
    <div class="card">
      <div class="card-body">
      <h5 class="card-title"><h3><b>Abstract:</b></h3>{abstract}</h5>  
      <p class="card-text" ><h3><b>Lead_Paragraph:</b></h3> {lead_paragraph}</p>
      <p className="cardDate"><h3><b>Pub Date:</b></h3>{pub_date}</p>
      <div >
        Id :{_id}
      </div>
      </div>
    </div>
    </Grid>
  );
};

export default Book;