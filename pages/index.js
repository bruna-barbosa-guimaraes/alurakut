import React from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/profileRelations'

function ProfileSideBar(propriedades) {
  return (
    <Box as="aside">
    <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }}/>
    <hr />

    <p>
      <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
        @{propriedades.githubUser}
      </a>
    </p>
    <hr />

    <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.itens.length})
      </h2> 
      {/* <ul>
          {comunidades.map((itemAtual) => {
            return (
              <li key={itemAtual.id}>
                <a href={`/users/${itemAtual.title}`}>
                <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
                </a>
              </li>
            )
          })}
        </ul> */}
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const [comunidades, setComunidades] = React.useState([{
    id:'4564521154621315241856526',
    title: 'Eu já fui EMO',
    image: 'https://t2.uc.ltmcdn.com/pt/images/7/7/8/img_como_se_vestir_como_um_emo_4877_600.jpg'
  }]);
  // const comunidades = comunidades [0];
  // const setComunidades = [= comunidades[1]];
  const usuario = 'brunaguimaraesssss';
  const pessoasFavoritas = [ 
    'VGuimaraes5', 
    'KamilaFreitas', 
    'kleberandrade', 
    'GustavoSpigo', 
    'rafaballerini', 
    'omariosouto'
  ];

  // Pegar o array de dados do github
  const [seguidores, setSeguidores] = React.useState([]);
  React.useEffect (function () {
    fetch('https://api.github.com/users/brunaguimaraesssss/followers')
      .then (function (respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then (function (respostaCompleta) {
      setSeguidores(respostaCompleta);
    })
  }, []) //array vazio para que ele rode apenas uma vez

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> */}
        <div className="profileArea" style={{ gridArea: 'profileArea'}}>
          <ProfileSideBar githubUser={usuario}/>
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function hadleCriaComunidade(e)  {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              // comunidades.push('Alura Stars');
              const comunidade = {
                id: new Date().toString(),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image')
              }
              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas);
            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Amigos ({pessoasFavoritas.length})
            </h2> 
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                    <img src={`https://github.com/${itemAtual}.png`} />
                    <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBox title="Seguidores" itens={seguidores} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2> 
            <ul>
                {comunidades.map((itemAtual) => {
                  return (
                    <li key={itemAtual.id}>
                      <a href={`/users/${itemAtual.title}`}>
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
          </ProfileRelationsBoxWrapper>   
        </div>
      </MainGrid>
    </> 
  )
}
