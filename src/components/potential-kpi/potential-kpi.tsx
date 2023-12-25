import { Box, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import React from 'react';
// @ts-ignore
import iconPotentialGrass from '../../images/grass-white.png';
// @ts-ignore
import knowMore from '../../images/know-more-potentials.png';
// @ts-ignore
import iconActivity from '../../images/new-activity-white.png';
// @ts-ignore
import iconGardens from '../../images/new-gardens-white.png';
// @ts-ignore
import iconNewTrees from '../../images/new-trees-white.png';
// @ts-ignore
import iconParking from '../../images/parking-white.png';
// @ts-ignore
import iconPavement from '../../images/pavement-white.png';
// @ts-ignore
import iconRoof from '../../images/roof-white.png';
import InfoTooltip from '../info-tooltip/info-tooltip';

const useStyles = makeStyles({
  chart: {
    display: 'flex',
    placeContent: 'center',
    placeItems: 'center',
  },
});

interface Props {
  region: any; //
}

/**
 * Potential KPI component
 * @param cityId - the city
 */
const PotentialKPIs: React.FC<Props> = ({ region }) => {
  const smallScreen = useMediaQuery('(max-width:600px)');

  return (
    <>
      <Box
        style={{
          // width: '20rem',
          height: 'auto',
          backgroundColor: '#2FA03F',
          padding: smallScreen ? '0.5rem' : '2rem',
          marginBottom: '1rem',
          borderRadius: '1rem',
        }}
      >
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: '0.5rem 0',
          }}
        >
          <Box
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 8fr',
              gridGap: smallScreen ? '0.5rem' : '1rem',
            }}
          >
            <>
              <img
                src={iconPavement}
                alt=""
                style={{
                  height: '1.5rem',
                  width: '1.5rem',
                }}
              />
            </>
            <Box style={{ display: 'flex', flexDirection: 'row' }}>
              <Typography
                variant="subtitle1"
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                Useless pavement
              </Typography>
              <InfoTooltip
                title="Useless pavement"
                details="Dit getal geeft aan hoeveel m² zinloze verharding (verharding zonder functie) er op het trottoir in een buurt ligt. De zinloze verharding kan vervangen worden door een beplantingsvak."
              />
            </Box>
          </Box>

          <Typography
            variant="body1"
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {/* {NumberUtils.toFixed(region._UselesPavedArea, 2)} */}
            {Math.round(region._UselesPavedArea)}
            {` m²`}
          </Typography>
        </Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: '0.5rem 0',
          }}
        >
          <Box
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 8fr',
              gridGap: smallScreen ? '0.4rem' : '1rem',
            }}
          >
            <>
              <img
                src={iconParking}
                alt=""
                style={{
                  height: '1.5rem',
                  width: '1.5rem',
                }}
              />
            </>

            <Box style={{ display: 'flex', flexDirection: 'row' }}>
              <Typography
                variant="subtitle1"
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                Green parking spaces
              </Typography>
              <InfoTooltip
                title="Green parking spaces"
                details="Dit getal geeft aan hoeveel m² aan parkeervakken er totaal in een buurt ligt. Deze parkeervakken kunnen ingericht worden met open constructies waar gras doorheen groeit en in sommige gevallen een beplantingsvak. "
              />
            </Box>
          </Box>

          <Typography
            variant="body1"
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {/* {NumberUtils.toFixed(region._parkingArea, 2)} */}
            {Math.round(region._parkingArea)}
            {` m²`}
          </Typography>
        </Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: smallScreen ? '0.5rem' : '1rem',
          }}
        >
          <>
            <img
              src={iconNewTrees}
              alt=""
              style={{
                height: '1.5rem',
                width: '1.5rem',
              }}
            />
          </>

          <Box style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography
              variant="subtitle1"
              style={{
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              New trees to be planted
            </Typography>
            <InfoTooltip
              title="New trees to be planted"
              details="Dit getal geeft aan hoeveel nieuwe bomen (per categorie) er in een buurt bijgeplant kunnen worden. Dit is op basis van het bovengronds ruimtebeslag bepaald. "
            />
          </Box>
        </Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: '0.5rem 0',
          }}
        >
          <Box>
            <>{` `}</>
            <Typography
              variant="body1"
              style={{
                color: 'white',
                marginLeft: '2.5rem',
              }}
            >
              Category 1 (Large trees)
            </Typography>
          </Box>

          <Typography
            variant="body1"
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {region._countPotTreesCat1}
          </Typography>
        </Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: '0.5rem 0',
          }}
        >
          <Box>
            <>{` `}</>
            <Typography
              variant="body1"
              style={{
                color: 'white',
                marginLeft: '2.5rem',
              }}
            >
              Category 2 (Average trees)
            </Typography>
          </Box>

          <Typography
            variant="body1"
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {region._countPotTreesCat2}
          </Typography>
        </Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: '0.5rem 0',
          }}
        >
          <Box>
            <>{` `}</>
            <Typography
              variant="body1"
              style={{
                color: 'white',
                marginLeft: '2.5rem',
              }}
            >
              Category 3 (Small trees)
            </Typography>
          </Box>

          <Typography
            variant="body1"
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {region._countPotTreesCat3}
          </Typography>
        </Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: smallScreen ? '0.5rem' : '1rem',
          }}
        >
          <>
            <img
              src={iconRoof}
              alt=""
              style={{
                height: '1.5rem',
                width: '1.5rem',
              }}
            />
          </>
          <Box style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography
              variant="subtitle1"
              style={{
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              Green roofs
            </Typography>
            <InfoTooltip
              title="Green roofs"
              // details="Dit getal geeft aan hoeveel m² aan platte daken er in een buurt ligt,
              // we maken daarbij onderscheid in:
              // Dak met helling 0-6% zeer geschikt voor groen dak
              // Dak met helling 6-8,5% groen dak mogelijk, maar complexer
              // Dak met helling >8,5% groen dak te complex en kostbaar (op dit moment)"
              details={
                <React.Fragment>
                  Dit getal geeft aan hoeveel m2 aan platte daken er in een
                  buurt ligt, we maken daarbij onderscheid in:
                  <br />
                  <br />
                  <li>Dak met helling 0-6% zeer geschikt voor groen dak</li>
                  <li>
                    Dak met helling 6-8,5% groen dak mogelijk, maar complexer
                  </li>
                  <li>
                    Dak met helling {'>'}8,5% groen dak te complex en kostbaar (op
                    dit moment)
                  </li>
                </React.Fragment>
              }
            />
          </Box>
        </Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: '0.5rem 0',
          }}
        >
          <Box
            style={{
              display: 'grid',
            }}
          >
            <>{` `}</>
            <Typography
              variant="body1"
              style={{
                color: 'white',
                marginLeft: '2.5rem',
              }}
            >
              Roof slope 0-6%
            </Typography>
          </Box>

          <Typography
            variant="body1"
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {`${Math.round(region._areaGreenRoofLevel0)} m²`}
          </Typography>
        </Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: '0.5rem 0',
          }}
        >
          <Box
            style={{
              display: 'flex',
            }}
          >
            <>{` `}</>
            <Typography
              variant="body1"
              style={{
                color: 'white',
                marginLeft: '2.5rem',
              }}
            >
              {`Roof slope 6-8,5%`}
            </Typography>
          </Box>

          <Typography
            variant="body1"
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {`${Math.round(region._areaGreenRoofLevel1)} m²`}
          </Typography>
        </Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: '0.5rem 0',
          }}
        >
          <Box
            style={{
              display: 'grid',
            }}
          >
            <>{` `}</>
            <Typography
              variant="body1"
              style={{
                color: 'white',
                marginLeft: '2.5rem',
              }}
            >
              {`Roof slope >8,5% (unsuitable)`}
            </Typography>
          </Box>

          <Typography
            variant="body1"
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {`${Math.round(region._areaGreenRoofLevel2)} m²`}
          </Typography>
        </Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: '0.5rem 0',
          }}
        >
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: smallScreen ? '0.5rem' : '1rem',
            }}
          >
            <>
              <img
                src={iconActivity}
                alt=""
                style={{
                  height: '1.5rem',
                  width: '1.5rem',
                }}
              />
            </>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Box style={{ display: 'flex', flexDirection: 'row' }}>
                <Typography
                  variant="subtitle1"
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  New green activity/cool places
                </Typography>
                <InfoTooltip
                  title="New green activity/cool places"
                  details="Dit getal geeft aan hoeveel nieuwe groene verblijfsplekken er in een buurt aangelegd kunnen worden of bestaande plekken omgevormd kunnen worden."
                />
              </Box>

              <Typography
                variant="body1"
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: '0.5rem 0',
          }}
        >
          <Box
            style={{
              display: 'grid',
            }}
          >
            <>{` `}</>
            <Typography
              variant="body1"
              style={{
                color: 'white',
                marginLeft: '2.5rem',
              }}
            >
              {`<500 m²`}
            </Typography>
          </Box>

          <Typography
            variant="body1"
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {region[`_countGreenStay_250-500`]}
          </Typography>
        </Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: '0.5rem 0',
          }}
        >
          <Box
            style={{
              display: 'grid',
            }}
          >
            <>{` `}</>
            <Typography
              variant="body1"
              style={{
                color: 'white',
                marginLeft: '2.5rem',
              }}
            >
              {`500-1000 m²`}
            </Typography>
          </Box>

          <Typography
            variant="body1"
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {region[`_countGreenStay_500-1000`]}
          </Typography>
        </Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: '0.5rem 0',
          }}
        >
          <Box
            style={{
              display: 'grid',
            }}
          >
            <>{` `}</>
            <Typography
              variant="body1"
              style={{
                color: 'white',
                marginLeft: '2.5rem',
              }}
            >
              {`1000-2500 m²`}
            </Typography>
          </Box>

          <Typography
            variant="body1"
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {region[`_countGreenStay_1000-2500`]}
          </Typography>
        </Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: '0.5rem 0',
          }}
        >
          <Box
            style={{
              display: 'grid',
            }}
          >
            <>{` `}</>
            <Typography
              variant="body1"
              style={{
                color: 'white',
                marginLeft: '2.5rem',
              }}
            >
              {`2500-5000 m²`}
            </Typography>
          </Box>

          <Typography
            variant="body1"
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {/* {region._countPotTreesCat2} */}
            {region[`_countGreenStay_2500-5000`]}
          </Typography>
        </Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: '0.5rem 0',
          }}
        >
          <Box
            style={{
              display: 'grid',
            }}
          >
            <>{` `}</>
            <Typography
              variant="body1"
              style={{
                color: 'white',
                marginLeft: '2.5rem',
              }}
            >
              {`>5000 m²`}
            </Typography>
          </Box>

          <Typography
            variant="body1"
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {/* {region._countPotTreesCat3} */}
            {region[`_countGreenStay_>5000`]}
          </Typography>
        </Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: '0.5rem 0',
          }}
        >
          <Box
            style={{
              display: 'flex',
            }}
          >
            <>
              <img
                src={iconGardens}
                alt=""
                style={{
                  height: '1.5rem',
                  width: '1.5rem',
                }}
              />
            </>

            <Box style={{ display: 'flex', flexDirection: 'row' }}>
              <Typography
                variant="subtitle1"
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  marginLeft: '1rem',
                }}
              >
                Lawns that can be transformed into other vegetation
              </Typography>
              <InfoTooltip
                title="Lawns that can be transformed into other vegetation"
                details="Dit getal geeft aan hoeveel m² gazon er in een buurt ligt, die je kan omvormen naar andere vormen van vegetatie."
              />
            </Box>
          </Box>

          <Typography
            variant="body1"
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {/* {NumberUtils.toFixed(region._publicLawnArea, 2)} */}
            {Math.round(region._publicLawnArea)}
            {` m²`}
          </Typography>
        </Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: smallScreen ? '0.5rem' : '1rem',
          }}
        >
          <>
            <img
              src={iconPotentialGrass}
              alt=""
              style={{
                height: '1.5rem',
                width: '1.5rem',
              }}
            />
          </>

          <Box style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography
              variant="subtitle1"
              style={{
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              Greenify gardens
            </Typography>
            <InfoTooltip
              title="Greenify gardens"
              details="Dit getal geeft op tuinniveau aan hoeveel % van een tuin nog te vergroenen is (60% groen is het optimum). Daarbij zijn de tuinen ingedeeld in vijf categorieën en geven we het aantal tuinen wat in die categorie valt. "
            />
          </Box>
        </Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: '0.5rem 0',
          }}
        >
          <Box
            style={{
              display: 'grid',
            }}
          >
            <>{` `}</>
            <Typography
              variant="body1"
              style={{
                color: 'white',
                marginLeft: '2.5rem',
              }}
            >
              {`Gardens optimal green (60%)`}
            </Typography>
          </Box>

          <Typography
            variant="body1"
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {region[`_countGreenGarden_>60`]}
          </Typography>
        </Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: '0.5rem 0',
          }}
        >
          <Box
            style={{
              display: 'grid',
            }}
          >
            <>{` `}</>
            <Typography
              variant="body1"
              style={{
                color: 'white',
                marginLeft: '2.5rem',
              }}
            >
              {`Gardens 0-10% greener`}
            </Typography>
          </Box>

          <Typography
            variant="body1"
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {region[`_countPotGreenGarden_0_10`]}
          </Typography>
        </Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: '0.5rem 0',
          }}
        >
          <Box
            style={{
              display: 'grid',
            }}
          >
            <>{` `}</>
            <Typography
              variant="body1"
              style={{
                color: 'white',
                marginLeft: '2.5rem',
              }}
            >
              {`Gardens 10-20% greener`}
            </Typography>
          </Box>

          <Typography
            variant="body1"
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {region._countPotGreenGarden_10_20}
          </Typography>
        </Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: '0.5rem 0',
          }}
        >
          <Box
            style={{
              display: 'grid',
            }}
          >
            <>{` `}</>
            <Typography
              variant="body1"
              style={{
                color: 'white',
                marginLeft: '2.5rem',
              }}
            >
              {`Gardens 20-30% greener`}
            </Typography>
          </Box>

          <Typography
            variant="body1"
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {region._countPotGreenGarden_20_30}
          </Typography>
        </Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: '0.5rem 0',
          }}
        >
          <Box
            style={{
              display: 'grid',
            }}
          >
            <>{` `}</>
            <Typography
              variant="body1"
              style={{
                color: 'white',
                marginLeft: '2.5rem',
              }}
            >
              {`Gardens >30% greener`}
            </Typography>
          </Box>

          <Typography
            variant="body1"
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {region[`_countPotGreenGarden_>30`]}
          </Typography>
        </Box>
        <Typography
          variant="h6"
          style={{
            color: 'white',
            fontWeight: 'bold',
            margin: '2rem 0 1rem',
          }}
        >
          Find out how you can turn your potential into reality
        </Typography>

        <Box
          style={{
            color: 'white',
            fontWeight: 'bold',
            justifyContent: 'space-between',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <img src={knowMore} style={{ width: '150px', height: '100px' }}></img>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body1">
              To further understand how you may utilize the potential identified
              in your city you can contact Sweco NL for consultation.
            </Typography>
            <Box style={{ margin: smallScreen ? '1rem 0' : 'unset' }}>
              <a
                href="https://groenestadchallenge.nl/vergroeningspotenties/"
                target="_blank"
                style={{
                  textDecoration: 'none',
                  textTransform: 'none',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                Groene stad challenge
                <i
                  className="fas fa-external-link-alt"
                  style={{
                    margin: '0 0.5rem',
                    color: 'white',
                  }}
                ></i>
              </a>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PotentialKPIs;
