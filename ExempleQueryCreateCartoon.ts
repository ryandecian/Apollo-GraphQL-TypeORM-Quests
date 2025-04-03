// mutation {
//     createCartoon(NewCartoon: {
//       name: "Captain Flam"
//       description: "Un héros de l'espace"
//       nb_of_episodes: 52
//       nb_of_seasons: 1
//       genres: ["Science-fiction", "Aventure"]
//       realisator: "Hiroshi Sasagawa"
//       author: "Edmond Hamilton"
//       ft_diffusion: "1978-01-07"
//       personnages: [
//         {
//           name: "Captain Flam"
//           role: "friend"
//           short_description: "Héros intelligent et courageux."
//         }
//       ]
//     }) {
//       id
//       name
//       personnages {
//         name
//         role
//         short_description
//       }
//     }
//   }