import {
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import WinnerBanner from 'components/banner/winnerBanner';
import React, { useRef } from 'react';
import { HealthIndicator, useStyles } from 'styles/compare';
import * as NumberUtils from '../../../utils/number-utils';
// @ts-ignore
import greenScoreIcon from '../../../images/icon-amount.png';
// @ts-ignore
import percentageIcon from '../../../images/icon-percentage.png';
// @ts-ignore
import healthIcon from '../../../images/icon-health.png';
// @ts-ignore
import distributionIcon from '../../../images/icon-distribution.png';
// @ts-ignore
import capitaIcon from '../../../images/icon-per-capita.png';
// @ts-ignore
import treeIcon from '../../../images/icon-trees.png';
// @ts-ignore
import grassIcon from '../../../images/icon-grass.png';
// @ts-ignore
import vsImg from '../../../images/img-versus.png';
import { Add, ArrowForwardIos, ArrowBackIos } from '@material-ui/icons';
import { navigate } from 'gatsby';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ArrowForward from '@material-ui/icons/ArrowForward';

interface Props {
  open?: boolean;
  setOpen?: any;
  cityAtLeft?: any;
  cityAtRight?: any;
  cityAtEnd?: any;
  leftCity?: string;
  setLeftCity?: any;
  rightCity?: string;
  setRightCity?: any;
  endCity?: string;
  setEndCity?: any;
  leftMenuOpen?: boolean;
  setLeftMenuOpen?: any;
  rightMenuOpen?: boolean;
  setRightMenuOpen?: any;
  endMenuOpen?: boolean;
  setEndMenuOpen?: any;
  anchorEl?: any;
  handleClick?: any;
  handleClose?: any;
  getCompareLink?: any;
  onCompareCity?: any;
  citiesIds?: any;
  citiesList?: any;
  filterOptions?: any;
  setcityAtEnd?: any;
  arrow?: any;
  setArrow?: any;
  arrowHandler?: any;
}

const SmallCompare: React.FC<Props> = ({
  open,
  setOpen,
  cityAtLeft,
  cityAtRight,
  cityAtEnd,
  leftCity,
  setLeftCity,
  rightCity,
  setRightCity,
  endCity,
  setEndCity,
  leftMenuOpen,
  setLeftMenuOpen,
  rightMenuOpen,
  setRightMenuOpen,
  endMenuOpen,
  setEndMenuOpen,
  anchorEl,
  handleClick,
  handleClose,
  getCompareLink,
  onCompareCity,
  citiesIds,
  citiesList,
  filterOptions,
  setcityAtEnd,
  arrow,
  arrowHandler,
  setArrow
}) => {
  const {
    root,
    rootWithImage,
    redoBtn,
    rowStyle,
    boxStyle,
    dividerStyle,
    iconBox,
  } = useStyles({});
  const printRef = useRef();
  return (
    <Box
      className={
        cityAtLeft && cityAtRight && cityAtLeft !== cityAtRight
          ? root
          : rootWithImage
      }
    >
      {(cityAtLeft && cityAtRight && cityAtEnd) ||
        (open === false && cityAtLeft && cityAtRight) ? (
        // && (cityAtLeft && cityAtRight)
        // @ts-ignore
        <Box
          ref={printRef}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <Box>
            <WinnerBanner
              setOpen={setOpen}
              open={open}
              cityAtLeft={cityAtLeft}
              printRef={printRef}
              cityAtRight={cityAtRight}
              cityAtEnd={endCity ? cityAtEnd : ''}
              winnerCity={
                cityAtLeft && cityAtRight && cityAtEnd
                  ? cityAtLeft?.green_score > cityAtRight?.green_score &&
                    cityAtLeft?.green_score > cityAtEnd?.green_score
                    ? cityAtLeft?.id
                    : cityAtRight?.green_score > cityAtEnd?.green_score
                      ? cityAtRight?.id
                      : cityAtEnd?.id
                  : cityAtLeft.green_score > cityAtRight.green_score
                    ? cityAtLeft.id
                    : cityAtRight.id
              }
            />
          </Box>
          <Box style={{ display: 'flex' }}>
            {cityAtEnd && arrow === true && (
              <IconButton style={{
                position: 'absolute', top: '51.5%',
                left: 5, minWidth: '40px', borderRadius: '30px', boxShadow: 'rgb(0 0 0 / 25%) 0px 0px 12px 0px'
              }}>
                <ArrowBackIos onClick={arrowHandler} style={{ width: '16px', height: '16px' }} />
              </IconButton>
            )}
            <Box style={{ margin: 'auto' }}>
              <Box className={boxStyle}>
                {arrow === false && (
                  <Box
                    style={{
                      display: 'flex',
                      justifyContent: ' space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      style={{
                        fontWeight: 'bold',
                      }}
                    >
                      {cityAtLeft?.id}
                    </Typography>

                    <Button
                      variant="contained"
                      id="basic-button-left"
                      aria-owns={leftMenuOpen ? 'basic-menu-left' : null}
                      aria-controls={
                        leftMenuOpen ? 'basic-menu-left' : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={leftMenuOpen ? 'true' : undefined}
                      onClick={e => {
                        handleClick(e);
                        setLeftMenuOpen(true);
                      }}
                      className={iconBox}
                    >
                      <i
                        className="fa fa-ellipsis-v"
                        style={{
                          fontSize: '1rem',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        aria-hidden="true"
                      ></i>
                    </Button>
                    <Menu
                      id="basic-menu-left"
                      anchorEl={anchorEl}
                      open={leftMenuOpen}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button-left',
                      }}
                    >
                      <MenuItem onClick={handleClose}>
                        <Box
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            color: '#698d29',
                          }}
                          className={redoBtn}
                          onClick={() => getCompareLink(0)}
                        >
                          <i
                            className="fas fa-redo-alt"
                            style={{ fontSize: '1rem' }}
                          ></i>
                          <Typography
                            variant="subtitle1"
                            style={{ margin: '0 0.5rem', fontWeight: 'bold' }}
                          >
                            Change city
                          </Typography>
                        </Box>
                      </MenuItem>
                    </Menu>
                  </Box>
                )}
                {(arrow === false || arrow === true) && (
                  <Box
                    style={{
                      display: 'flex',
                      justifyContent: ' space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      style={{
                        fontWeight: 'bold',
                      }}
                    >
                      {cityAtRight?.id}
                    </Typography>
                    <Button
                      variant="contained"
                      id="basic-button-right"
                      aria-owns={rightMenuOpen ? 'basic-menu-right' : null}
                      aria-controls={
                        rightMenuOpen ? 'basic-menu-right' : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={rightMenuOpen ? 'true' : undefined}
                      onClick={e => {
                        handleClick(e);
                        setRightMenuOpen(true);
                      }}
                      className={iconBox}
                    >
                      <i
                        className="fa fa-ellipsis-v"
                        style={{
                          fontSize: '1rem',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        aria-hidden="true"
                      ></i>
                    </Button>
                    <Menu
                      id="basic-menu-right"
                      anchorEl={anchorEl}
                      open={rightMenuOpen}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button-right',
                      }}
                    >
                      <MenuItem onClick={handleClose}>
                        <Box
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            color: '#698d29',
                          }}
                          className={redoBtn}
                          onClick={() => getCompareLink(1)}
                        >
                          <i
                            className="fas fa-redo-alt"
                            style={{ fontSize: '1rem' }}
                          ></i>
                          <Typography
                            variant="subtitle1"
                            style={{ margin: '0 0.5rem', fontWeight: 'bold' }}
                          >
                            Change city
                          </Typography>
                        </Box>
                      </MenuItem>
                    </Menu>
                    {/* <Button
                  className={redoBtn}
                  style={{}}
                  onClick={() => getCompareLink(1)}
                >
                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      color: '#698d29',
                    }}
                  >
                    <i
                      className="fas fa-redo-alt"
                      style={{ fontSize: '1rem' }}
                    ></i>
                    <Typography
                      variant="subtitle1"
                      style={{ margin: '0 0.5rem', fontWeight: 'bold' }}
                    >
                      Change city
                    </Typography>
                  </Box>
                </Button> */}
                  </Box>
                )}
                {arrow === true && (
                  <Box
                    style={{
                      display: 'flex',
                      justifyContent: ' space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      style={{
                        fontWeight: 'bold',
                      }}
                    >
                      {cityAtEnd?.id}
                    </Typography>
                    <Button
                      variant="contained"
                      id="basic-button-end"
                      aria-owns={endMenuOpen ? 'basic-menu-end' : null}
                      aria-controls={endMenuOpen ? 'basic-menu-end' : undefined}
                      aria-haspopup="true"
                      aria-expanded={endMenuOpen ? 'true' : undefined}
                      onClick={e => {
                        handleClick(e);
                        setEndMenuOpen(true);
                      }}
                      className={iconBox}
                    >
                      <i
                        className="fa fa-ellipsis-v"
                        style={{
                          fontSize: '1rem',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        aria-hidden="true"
                      ></i>
                    </Button>
                    <Menu
                      id="basic-menu-end"
                      anchorEl={anchorEl}
                      open={endMenuOpen}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button-end',
                      }}
                    >
                      <MenuItem onClick={handleClose}>
                        <Box
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            color: '#698d29',
                          }}
                          className={redoBtn}
                          onClick={() => getCompareLink(2)}
                        >
                          <i
                            className="fas fa-redo-alt"
                            style={{ fontSize: '1rem' }}
                          ></i>
                          <Typography
                            variant="subtitle1"
                            style={{ margin: '0 0.5rem', fontWeight: 'bold' }}
                          >
                            Change city
                          </Typography>
                        </Box>
                      </MenuItem>
                    </Menu>
                    {/* <Button
                  className={redoBtn}
                  style={{}}
                  onClick={() => getCompareLink(2)}
                >
                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      color: '#698d29',
                    }}
                  >
                    <i
                      className="fas fa-redo-alt"
                      style={{ fontSize: '1rem' }}
                    ></i>
                    <Typography
                      variant="subtitle1"
                      style={{ margin: '0 0.5rem', fontWeight: 'bold' }}
                    >
                      Change city
                    </Typography>
                  </Box>
                </Button> */}
                  </Box>
                )}
              </Box>
              <Box style={{ margin: '3rem auto' }}>
                <Box style={{ display: 'flex' }}>
                  <img src={greenScoreIcon} alt="green score" width="30px" />
                  <Typography
                    variant="subtitle1"
                    style={{
                      marginLeft: '10px',
                    }}
                  >
                    Green Score
                  </Typography>
                </Box>
                <Divider className={dividerStyle} />
                <Box className={boxStyle}>
                  {arrow === false && (
                    <Box
                      className={rowStyle}
                      style={{
                        backgroundColor:
                          cityAtLeft && cityAtRight && cityAtEnd
                            ? Math.round(cityAtLeft?.green_score * 100) / 100 >
                              Math.round(cityAtRight?.green_score * 100) / 100
                              ? Math.round(cityAtLeft?.green_score * 100) / 100 >
                                Math.round(cityAtEnd?.green_score * 100) / 100
                                ? '#99c93c'
                                : 'white'
                              : '#fff'
                            : Math.round(cityAtLeft?.green_score * 100) / 100 >
                              Math.round(cityAtRight?.green_score * 100) / 100
                              ? '#99c93c'
                              : 'white',
                        color:
                          cityAtLeft && cityAtRight && cityAtEnd
                            ? Math.round(cityAtLeft?.green_score * 100) / 100 >
                              Math.round(cityAtRight?.green_score * 100) / 100
                              ? Math.round(cityAtLeft?.green_score * 100) / 100 >
                                Math.round(cityAtEnd?.green_score * 100) / 100
                                ? '#fff'
                                : 'black'
                              : 'black'
                            : Math.round(cityAtLeft?.green_score * 100) / 100 >
                              Math.round(cityAtRight?.green_score * 100) / 100
                              ? '#fff'
                              : 'black',
                      }}
                    >
                      <Typography
                        style={{
                          fontWeight: 'bold',

                          marginRight: '0rem',
                        }}
                      >
                        {Math.round(cityAtLeft?.green_score * 100) / 100}
                      </Typography>
                    </Box>
                  )}
                  {(arrow === false || arrow === true) && (
                    <Box
                      style={{
                        display: 'flex',
                        borderRadius: '50px',
                        width: 'max-content',
                        padding: '7px',
                        backgroundColor:
                          cityAtLeft && cityAtRight && cityAtEnd
                            ? Math.round(cityAtRight?.green_score * 100) / 100 >
                              Math.round(cityAtLeft?.green_score * 100) / 100
                              ? Math.round(cityAtRight?.green_score * 100) / 100 >
                                Math.round(cityAtEnd?.green_score * 100) / 100
                                ? '#99c93c'
                                : 'white'
                              : '#fff'
                            : Math.round(cityAtRight?.green_score * 100) / 100 >
                              Math.round(cityAtLeft?.green_score * 100) / 100
                              ? '#99c93c'
                              : 'white',
                        color:
                          cityAtLeft && cityAtRight && cityAtEnd
                            ? Math.round(cityAtRight?.green_score * 100) / 100 >
                              Math.round(cityAtLeft?.green_score * 100) / 100
                              ? Math.round(cityAtRight?.green_score * 100) / 100 >
                                Math.round(cityAtEnd?.green_score * 100) / 100
                                ? '#fff'
                                : 'black'
                              : 'black'
                            : Math.round(cityAtRight?.green_score * 100) / 100 >
                              Math.round(cityAtLeft?.green_score * 100) / 100
                              ? '#fff'
                              : 'black',
                      }}
                    >
                      <Typography
                        style={{
                          fontWeight: 'bold',

                          marginRight: '0rem',
                        }}
                      >
                        {Math.round(cityAtRight?.green_score * 100) / 100}
                      </Typography>
                    </Box>
                  )}
                  {arrow === true && (
                    <Box
                      className={rowStyle}
                      style={{
                        backgroundColor:
                          Math.round(cityAtEnd?.green_score * 100) / 100 >
                            Math.round(cityAtLeft?.green_score * 100) / 100
                            ? Math.round(cityAtEnd?.green_score * 100) / 100 >
                              Math.round(cityAtRight?.green_score * 100) / 100
                              ? '#99c93c'
                              : 'white'
                            : '#fff',
                        color:
                          Math.round(cityAtEnd?.green_score * 100) / 100 >
                            Math.round(cityAtLeft?.green_score * 100) / 100
                            ? Math.round(cityAtEnd?.green_score * 100) / 100 >
                              Math.round(cityAtRight?.green_score * 100) / 100
                              ? '#fff'
                              : 'black'
                            : 'black',
                      }}
                    >
                      <Typography
                        style={{
                          fontWeight: 'bold',

                          marginRight: '0rem',
                        }}
                      >
                        {Math.round(cityAtEnd?.green_score * 100) / 100}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>

              <Box style={{ margin: '3rem auto' }}>
                <Box style={{ display: 'flex' }}>
                  <img
                    src={percentageIcon}
                    alt="Percentage of urban green space"
                    width="30px"
                  />
                  <Typography
                    variant="subtitle1"
                    style={{
                      marginLeft: '10px',
                    }}
                  >
                    Percentage of urban green space
                  </Typography>
                </Box>
                <Divider className={dividerStyle} />
                <Box className={boxStyle}>
                  {arrow === false && (
                    <Box
                      className={rowStyle}
                      style={{
                        backgroundColor:
                          cityAtLeft && cityAtRight && cityAtEnd
                            ? NumberUtils.toPercentage(
                              cityAtLeft?.total_green_space_percentage
                            ) >
                              NumberUtils.toPercentage(
                                cityAtRight?.total_green_space_percentage
                              )
                              ? NumberUtils.toPercentage(
                                cityAtLeft?.total_green_space_percentage
                              ) >
                                NumberUtils.toPercentage(
                                  cityAtEnd?.total_green_space_percentage
                                )
                                ? '#99c93c'
                                : 'white'
                              : '#fff'
                            : NumberUtils.toPercentage(
                              cityAtLeft?.total_green_space_percentage
                            ) >
                              NumberUtils.toPercentage(
                                cityAtRight?.total_green_space_percentage
                              )
                              ? '#99c93c'
                              : 'white',
                        color:
                          cityAtLeft && cityAtRight && cityAtEnd
                            ? NumberUtils.toPercentage(
                              cityAtLeft?.total_green_space_percentage
                            ) >
                              NumberUtils.toPercentage(
                                cityAtRight?.total_green_space_percentage
                              )
                              ? NumberUtils.toPercentage(
                                cityAtLeft?.total_green_space_percentage
                              ) >
                                NumberUtils.toPercentage(
                                  cityAtEnd?.total_green_space_percentage
                                )
                                ? '#fff'
                                : 'black'
                              : 'black'
                            : NumberUtils.toPercentage(
                              cityAtLeft?.total_green_space_percentage
                            ) >
                              NumberUtils.toPercentage(
                                cityAtRight?.total_green_space_percentage
                              )
                              ? '#fff'
                              : 'black',
                      }}
                    >
                      <Typography
                        style={{
                          fontWeight: 'bold',

                          marginRight: '0rem',
                        }}
                      >
                        {NumberUtils.toPercentage(
                          cityAtLeft?.total_green_space_percentage
                        )}
                      </Typography>
                    </Box>
                  )}
                  {(arrow === false || arrow === true) && (
                    <Box
                      style={{
                        display: 'flex',
                        borderRadius: '50px',
                        width: 'max-content',
                        padding: '7px',
                        backgroundColor:
                          cityAtLeft && cityAtRight && cityAtEnd
                            ? NumberUtils.toPercentage(
                              cityAtRight?.total_green_space_percentage
                            ) >
                              NumberUtils.toPercentage(
                                cityAtLeft?.total_green_space_percentage
                              )
                              ? NumberUtils.toPercentage(
                                cityAtRight?.total_green_space_percentage
                              ) >
                                NumberUtils.toPercentage(
                                  cityAtEnd?.total_green_space_percentage
                                )
                                ? '#99c93c'
                                : 'white'
                              : '#fff'
                            : NumberUtils.toPercentage(
                              cityAtRight?.total_green_space_percentage
                            ) >
                              NumberUtils.toPercentage(
                                cityAtLeft?.total_green_space_percentage
                              )
                              ? '#99c93c'
                              : 'white',
                        color:
                          cityAtLeft && cityAtRight && cityAtEnd
                            ? NumberUtils.toPercentage(
                              cityAtRight?.total_green_space_percentage
                            ) >
                              NumberUtils.toPercentage(
                                cityAtLeft?.total_green_space_percentage
                              )
                              ? NumberUtils.toPercentage(
                                cityAtRight?.total_green_space_percentage
                              ) >
                                NumberUtils.toPercentage(
                                  cityAtEnd?.total_green_space_percentage
                                )
                                ? '#fff'
                                : 'black'
                              : 'black'
                            : NumberUtils.toPercentage(
                              cityAtRight?.total_green_space_percentage
                            ) >
                              NumberUtils.toPercentage(
                                cityAtLeft?.total_green_space_percentage
                              )
                              ? '#fff'
                              : 'black',
                      }}
                    >
                      <Typography
                        style={{
                          fontWeight: 'bold',

                          marginRight: '0rem',
                        }}
                      >
                        {NumberUtils.toPercentage(
                          cityAtRight?.total_green_space_percentage
                        )}
                      </Typography>
                    </Box>
                  )}
                  {arrow === true && (
                    <Box
                      style={{
                        display: 'flex',
                        borderRadius: '50px',
                        width: 'max-content',
                        padding: '7px',
                        backgroundColor:
                          NumberUtils.toPercentage(
                            cityAtEnd?.total_green_space_percentage
                          ) >
                            NumberUtils.toPercentage(
                              cityAtLeft?.total_green_space_percentage
                            )
                            ? NumberUtils.toPercentage(
                              cityAtEnd?.total_green_space_percentage
                            ) >
                              NumberUtils.toPercentage(
                                cityAtRight?.total_green_space_percentage
                              )
                              ? '#99c93c'
                              : 'white'
                            : '#fff',
                        color:
                          NumberUtils.toPercentage(
                            cityAtEnd?.total_green_space_percentage
                          ) >
                            NumberUtils.toPercentage(
                              cityAtLeft?.total_green_space_percentage
                            )
                            ? NumberUtils.toPercentage(
                              cityAtEnd?.total_green_space_percentage
                            ) >
                              NumberUtils.toPercentage(
                                cityAtRight?.total_green_space_percentage
                              )
                              ? '#fff'
                              : 'black'
                            : 'black',
                      }}
                    >
                      <Typography
                        style={{
                          fontWeight: 'bold',

                          marginRight: '0rem',
                        }}
                      >
                        {NumberUtils.toPercentage(
                          cityAtEnd?.total_green_space_percentage
                        )}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>

              <Box style={{ margin: '3rem auto' }}>
                <Box style={{ display: 'flex' }}>
                  <img
                    src={healthIcon}
                    alt="urban vegetation"
                    width="30px"
                    height="30px"
                  />
                  <Typography
                    variant="subtitle1"
                    style={{
                      marginLeft: '10px',
                    }}
                  >
                    Average health of urban vegetation
                  </Typography>
                </Box>
                <Divider className={dividerStyle} />
                <Box className={boxStyle}>
                  {arrow === false && (
                    <Box>
                      <Box style={{ display: 'flex', flexDirection: 'column' }}>
                        <Box
                          style={{
                            backgroundImage:
                              'linear-gradient(to right, #f1695b 1%, #f5c66e 54%, #99c93c)',
                            height: '2.5rem',
                            borderRadius: '50px',
                            width: '100%',
                            marginBottom: '0.2rem',
                          }}
                        ></Box>
                        <Box
                          style={{
                            marginLeft: `${cityAtLeft.ndvi_vegetation * 100}%`,
                          }}
                        >
                          <Box
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              width: '4rem',
                              maxWidth: '4rem',
                            }}
                          >
                            <HealthIndicator />
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        style={{
                          display: 'flex',
                          borderRadius: '50px',
                          width: 'max-content',
                          padding: '7px',
                          backgroundColor:
                            cityAtLeft && cityAtRight && cityAtEnd
                              ? NumberUtils.toFixed(
                                cityAtLeft?.ndvi_vegetation,
                                2
                              ) >
                                NumberUtils.toFixed(
                                  cityAtRight?.ndvi_vegetation,
                                  2
                                )
                                ? NumberUtils.toFixed(
                                  cityAtLeft?.ndvi_vegetation,
                                  2
                                ) >
                                  NumberUtils.toFixed(
                                    cityAtEnd?.ndvi_vegetation,
                                    2
                                  )
                                  ? '#99c93c'
                                  : 'white'
                                : '#fff'
                              : NumberUtils.toFixed(
                                cityAtLeft?.ndvi_vegetation,
                                2
                              ) >
                                NumberUtils.toFixed(
                                  cityAtRight?.ndvi_vegetation,
                                  2
                                )
                                ? '#99c93c'
                                : 'white',
                          color:
                            cityAtLeft && cityAtRight && cityAtEnd
                              ? NumberUtils.toFixed(
                                cityAtLeft?.ndvi_vegetation,
                                2
                              ) >
                                NumberUtils.toFixed(
                                  cityAtRight?.ndvi_vegetation,
                                  2
                                )
                                ? NumberUtils.toFixed(
                                  cityAtLeft?.ndvi_vegetation,
                                  2
                                ) >
                                  NumberUtils.toFixed(
                                    cityAtEnd?.ndvi_vegetation,
                                    2
                                  )
                                  ? '#fff'
                                  : 'black'
                                : 'black'
                              : NumberUtils.toFixed(
                                cityAtLeft?.ndvi_vegetation,
                                2
                              ) >
                                NumberUtils.toFixed(
                                  cityAtRight?.ndvi_vegetation,
                                  2
                                )
                                ? '#fff'
                                : 'black',
                        }}
                      >
                        <Typography
                          style={{
                            fontWeight: 'bold',

                            marginRight: '0rem',
                          }}
                        >
                          {NumberUtils.toFixed(cityAtLeft?.ndvi_vegetation, 2)}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  {(arrow === false || arrow === true) && (
                    <Box>
                      <Box style={{ display: 'flex', flexDirection: 'column' }}>
                        <Box
                          style={{
                            backgroundImage:
                              'linear-gradient(to right, #f1695b 1%, #f5c66e 54%, #99c93c)',
                            height: '2.5rem',
                            borderRadius: '50px',
                            width: '100%',
                            marginBottom: '0.2rem',
                            marginTop: '0rem',
                          }}
                        ></Box>
                        <Box
                          style={{
                            marginLeft: `${cityAtRight.ndvi_vegetation * 100}%`,
                          }}
                        >
                          <Box
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              width: '4rem',
                              maxWidth: '4rem',
                            }}
                          >
                            <HealthIndicator />
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          borderRadius: '50px',
                          width: 'fit-content',
                          padding: '7px',
                          backgroundColor:
                            cityAtLeft && cityAtRight && cityAtEnd
                              ? NumberUtils.toFixed(
                                cityAtRight?.ndvi_vegetation,
                                2
                              ) >
                                NumberUtils.toFixed(
                                  cityAtLeft?.ndvi_vegetation,
                                  2
                                )
                                ? NumberUtils.toFixed(
                                  cityAtRight?.ndvi_vegetation,
                                  2
                                ) >
                                  NumberUtils.toFixed(
                                    cityAtEnd?.ndvi_vegetation,
                                    2
                                  )
                                  ? '#99c93c'
                                  : 'white'
                                : '#fff'
                              : NumberUtils.toFixed(
                                cityAtRight?.ndvi_vegetation,
                                2
                              ) >
                                NumberUtils.toFixed(
                                  cityAtLeft?.ndvi_vegetation,
                                  2
                                )
                                ? '#99c93c'
                                : 'white',
                          color:
                            cityAtLeft && cityAtRight && cityAtEnd
                              ? NumberUtils.toFixed(
                                cityAtRight?.ndvi_vegetation,
                                2
                              ) >
                                NumberUtils.toFixed(
                                  cityAtLeft?.ndvi_vegetation,
                                  2
                                )
                                ? NumberUtils.toFixed(
                                  cityAtRight?.ndvi_vegetation,
                                  2
                                ) >
                                  NumberUtils.toFixed(
                                    cityAtEnd?.ndvi_vegetation,
                                    2
                                  )
                                  ? '#fff'
                                  : 'black'
                                : 'black'
                              : NumberUtils.toFixed(
                                cityAtRight?.ndvi_vegetation,
                                2
                              ) >
                                NumberUtils.toFixed(
                                  cityAtLeft?.ndvi_vegetation,
                                  2
                                )
                                ? '#fff'
                                : 'black',
                        }}
                      >
                        <Typography
                          style={{
                            fontWeight: 'bold',
                            marginLeft: '0rem',

                            padding: '0.5rem',
                          }}
                        >
                          {NumberUtils.toFixed(cityAtRight?.ndvi_vegetation, 2)}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  {arrow === true && (
                    <Box>
                      <Box style={{ display: 'flex', flexDirection: 'column' }}>
                        <Box
                          style={{
                            backgroundImage:
                              'linear-gradient(to right, #f1695b 1%, #f5c66e 54%, #99c93c)',
                            height: '2.5rem',
                            borderRadius: '50px',
                            width: '100%',
                            marginBottom: '0.2rem',
                          }}
                        ></Box>
                        <Box
                          style={{
                            marginLeft: `${cityAtEnd.ndvi_vegetation * 100}%`,
                          }}
                        >
                          <Box
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              width: '4rem',
                              maxWidth: '4rem',
                            }}
                          >
                            <HealthIndicator />
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        style={{
                          display: 'flex',
                          borderRadius: '50px',
                          width: 'max-content',
                          padding: '7px',
                          backgroundColor:
                            NumberUtils.toFixed(cityAtEnd?.ndvi_vegetation, 2) >
                              NumberUtils.toFixed(cityAtLeft?.ndvi_vegetation, 2)
                              ? NumberUtils.toFixed(
                                cityAtEnd?.ndvi_vegetation,
                                2
                              ) >
                                NumberUtils.toFixed(
                                  cityAtRight?.ndvi_vegetation,
                                  2
                                )
                                ? '#99c93c'
                                : 'white'
                              : '#fff',
                          color:
                            NumberUtils.toFixed(cityAtEnd?.ndvi_vegetation, 2) >
                              NumberUtils.toFixed(cityAtLeft?.ndvi_vegetation, 2)
                              ? NumberUtils.toFixed(
                                cityAtEnd?.ndvi_vegetation,
                                2
                              ) >
                                NumberUtils.toFixed(
                                  cityAtRight?.ndvi_vegetation,
                                  2
                                )
                                ? '#fff'
                                : 'black'
                              : 'black',
                        }}
                      >
                        <Typography
                          style={{
                            fontWeight: 'bold',

                            marginRight: '0rem',
                          }}
                        >
                          {NumberUtils.toFixed(cityAtEnd?.ndvi_vegetation, 2)}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>

              <Box style={{ margin: '3rem auto' }}>
                <Box style={{ display: 'flex' }}>
                  <img
                    src={distributionIcon}
                    alt="Distribution of urban green space"
                    width="30px"
                  />
                  <Typography
                    variant="subtitle1"
                    style={{
                      marginLeft: '10px',
                    }}
                  >
                    Distribution of urban green space
                  </Typography>
                </Box>
                <Divider className={dividerStyle} />
                <Box className={boxStyle}>
                  {arrow === false && (
                    <Box
                      className={rowStyle}
                      style={{
                        backgroundColor:
                          cityAtLeft && cityAtRight && cityAtEnd
                            ? cityAtLeft?.grid_median_vegetation >
                              cityAtRight?.grid_median_vegetation
                              ? cityAtLeft?.grid_median_vegetation >
                                cityAtEnd?.grid_median_vegetation
                                ? '#99c93c'
                                : 'white'
                              : '#fff'
                            : cityAtLeft?.grid_median_vegetation >
                              cityAtRight?.grid_median_vegetation
                              ? '#99c93c'
                              : 'white',
                        color:
                          cityAtLeft && cityAtRight && cityAtEnd
                            ? cityAtLeft?.grid_median_vegetation >
                              cityAtRight?.grid_median_vegetation
                              ? cityAtLeft?.grid_median_vegetation >
                                cityAtEnd?.grid_median_vegetation
                                ? '#fff'
                                : 'black'
                              : 'black'
                            : cityAtLeft?.grid_median_vegetation >
                              cityAtRight?.grid_median_vegetation
                              ? '#fff'
                              : 'black',
                      }}
                    >
                      <Typography
                        style={{
                          fontWeight: 'bold',

                          marginRight: '0rem',
                        }}
                      >
                        {NumberUtils.toPercentage(
                          cityAtLeft?.grid_median_vegetation
                        )}
                      </Typography>
                    </Box>
                  )}
                  {(arrow === false || arrow === true) && (
                    <Box
                      style={{
                        display: 'flex',
                        borderRadius: '50px',
                        width: 'max-content',
                        padding: '7px',
                        backgroundColor:
                          cityAtLeft && cityAtRight && cityAtEnd
                            ? cityAtRight?.grid_median_vegetation >
                              cityAtLeft?.grid_median_vegetation
                              ? cityAtRight?.grid_median_vegetation >
                                cityAtEnd?.grid_median_vegetation
                                ? '#99c93c'
                                : 'white'
                              : '#fff'
                            : cityAtRight?.grid_median_vegetation >
                              cityAtLeft?.grid_median_vegetation
                              ? '#99c93c'
                              : 'white',
                        color:
                          cityAtLeft && cityAtRight && cityAtEnd
                            ? cityAtRight?.grid_median_vegetation >
                              cityAtLeft?.grid_median_vegetation
                              ? cityAtRight?.grid_median_vegetation >
                                cityAtEnd?.grid_median_vegetation
                                ? '#fff'
                                : 'black'
                              : 'black'
                            : cityAtRight?.grid_median_vegetation >
                              cityAtLeft?.grid_median_vegetation
                              ? '#fff'
                              : 'black',
                      }}
                    >
                      <Typography
                        style={{
                          fontWeight: 'bold',

                          marginRight: '0rem',
                        }}
                      >
                        {NumberUtils.toPercentage(
                          cityAtRight?.grid_median_vegetation
                        )}
                      </Typography>
                    </Box>
                  )}
                  {arrow === true && (
                    <Box
                      style={{
                        display: 'flex',
                        borderRadius: '50px',
                        width: 'max-content',
                        padding: '7px',
                        backgroundColor:
                          cityAtEnd?.grid_median_vegetation >
                            cityAtLeft?.grid_median_vegetation
                            ? cityAtEnd?.grid_median_vegetation >
                              cityAtRight?.grid_median_vegetation
                              ? '#99c93c'
                              : 'white'
                            : '#fff',
                        color:
                          cityAtEnd?.grid_median_vegetation >
                            cityAtLeft?.grid_median_vegetation
                            ? cityAtEnd?.grid_median_vegetation >
                              cityAtRight?.grid_median_vegetation
                              ? '#fff'
                              : 'black'
                            : 'black',
                      }}
                    >
                      <Typography
                        style={{
                          fontWeight: 'bold',

                          marginRight: '0rem',
                        }}
                      >
                        {NumberUtils.toPercentage(
                          cityAtEnd?.grid_median_vegetation
                        )}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>

              <Box style={{ margin: '3rem auto' }}>
                <Box style={{ display: 'flex' }}>
                  <img
                    src={capitaIcon}
                    alt="Urban green space per capita"
                    width="30px"
                  />
                  <Typography
                    variant="subtitle1"
                    style={{
                      marginLeft: '10px',
                    }}
                  >
                    Urban green space per capita
                  </Typography>
                </Box>
                <Divider className={dividerStyle} />
                <Box className={boxStyle}>
                  {arrow === false && (
                    <Box
                      className={rowStyle}
                      style={{
                        backgroundColor:
                          cityAtLeft && cityAtRight && cityAtEnd
                            ? cityAtLeft?.green_per_capita >
                              cityAtRight?.green_per_capita
                              ? cityAtLeft?.green_per_capita >
                                cityAtEnd?.green_per_capita
                                ? '#99c93c'
                                : 'white'
                              : '#fff'
                            : cityAtLeft?.green_per_capita >
                              cityAtRight?.green_per_capita
                              ? '#99c93c'
                              : 'white',
                        color:
                          cityAtLeft && cityAtRight && cityAtEnd
                            ? cityAtLeft?.green_per_capita >
                              cityAtRight?.green_per_capita
                              ? cityAtLeft?.green_per_capita >
                                cityAtEnd?.green_per_capita
                                ? '#fff'
                                : 'black'
                              : 'black'
                            : cityAtLeft?.green_per_capita >
                              cityAtRight?.green_per_capita
                              ? '#fff'
                              : 'black',
                      }}
                    >
                      <Typography
                        style={{
                          fontWeight: 'bold',

                          marginRight: '0rem',
                        }}
                      >
                        {`${NumberUtils.toFixed(
                          cityAtLeft?.green_per_capita,
                          1
                        )} m²`}
                      </Typography>
                    </Box>
                  )}
                  {(arrow === false || arrow === true) && (
                    <Box
                      style={{
                        display: 'flex',
                        borderRadius: '50px',
                        width: 'max-content',
                        padding: '7px',
                        backgroundColor:
                          cityAtLeft && cityAtRight && cityAtEnd
                            ? cityAtRight?.green_per_capita >
                              cityAtLeft?.green_per_capita
                              ? cityAtRight?.green_per_capita >
                                cityAtEnd?.green_per_capita
                                ? '#99c93c'
                                : 'white'
                              : '#fff'
                            : cityAtRight?.green_per_capita >
                              cityAtLeft?.green_per_capita
                              ? '#99c93c'
                              : 'white',
                        color:
                          cityAtLeft && cityAtRight && cityAtEnd
                            ? cityAtRight?.green_per_capita >
                              cityAtLeft?.green_per_capita
                              ? cityAtRight?.green_per_capita >
                                cityAtEnd?.green_per_capita
                                ? '#fff'
                                : 'black'
                              : 'black'
                            : cityAtRight?.green_per_capita >
                              cityAtLeft?.green_per_capita
                              ? '#fff'
                              : 'black',
                      }}
                    >
                      <Typography
                        style={{
                          fontWeight: 'bold',

                          marginRight: '0rem',
                        }}
                      >
                        {`${NumberUtils.toFixed(
                          cityAtRight?.green_per_capita,
                          1
                        )} m²`}
                      </Typography>
                    </Box>
                  )}
                  {arrow === true && (
                    <Box
                      className={rowStyle}
                      style={{
                        backgroundColor:
                          cityAtEnd?.green_per_capita >
                            cityAtLeft?.green_per_capita
                            ? cityAtEnd?.green_per_capita >
                              cityAtRight?.green_per_capita
                              ? '#99c93c'
                              : 'white'
                            : '#fff',
                        color:
                          cityAtEnd?.green_per_capita >
                            cityAtLeft?.green_per_capita
                            ? cityAtEnd?.green_per_capita >
                              cityAtRight?.green_per_capita
                              ? '#fff'
                              : 'black'
                            : 'black',
                      }}
                    >
                      <Typography
                        style={{
                          fontWeight: 'bold',

                          marginRight: '0rem',
                        }}
                      >
                        {`${NumberUtils.toFixed(
                          cityAtEnd?.green_per_capita,
                          1
                        )} m²`}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>

              <Box style={{ margin: '3rem auto' }}>
                <Box style={{ display: 'flex' }}>
                  <img
                    src={treeIcon}
                    alt="Distribution of urban green space"
                    width="30px"
                  />
                  <Typography
                    variant="subtitle1"
                    style={{
                      marginLeft: '10px',
                    }}
                  >
                    Percentage of urban area covered by trees
                  </Typography>
                </Box>
                <Divider className={dividerStyle} />
                <Box className={boxStyle}>
                  {arrow === false && (
                    <Box
                      className={rowStyle}
                      style={{
                        backgroundColor:
                          cityAtLeft && cityAtRight && cityAtEnd
                            ? cityAtLeft?.treecanopycover_percentage >
                              cityAtRight?.treecanopycover_percentage
                              ? cityAtLeft?.treecanopycover_percentage >
                                cityAtEnd?.treecanopycover_percentage
                                ? '#99c93c'
                                : 'white'
                              : '#fff'
                            : cityAtLeft?.treecanopycover_percentage >
                              cityAtRight?.treecanopycover_percentage
                              ? '#99c93c'
                              : 'white',
                        color:
                          cityAtLeft && cityAtRight && cityAtEnd
                            ? cityAtLeft?.treecanopycover_percentage >
                              cityAtRight?.treecanopycover_percentage
                              ? cityAtLeft?.treecanopycover_percentage >
                                cityAtEnd?.treecanopycover_percentage
                                ? '#fff'
                                : 'black'
                              : 'black'
                            : cityAtLeft?.treecanopycover_percentage >
                              cityAtRight?.treecanopycover_percentage
                              ? '#fff'
                              : 'black',
                      }}
                    >
                      <Typography
                        style={{
                          fontWeight: 'bold',

                          marginRight: '0rem',
                        }}
                      >
                        {NumberUtils.toPercentage(
                          cityAtLeft?.treecanopycover_percentage
                        )}
                      </Typography>
                    </Box>
                  )}
                  {(arrow === false || arrow === true) && (
                    <Box
                      style={{
                        display: 'flex',
                        borderRadius: '50px',
                        width: 'max-content',
                        padding: '7px',
                        backgroundColor:
                          cityAtLeft && cityAtRight && cityAtEnd
                            ? cityAtRight?.treecanopycover_percentage >
                              cityAtLeft?.treecanopycover_percentage
                              ? cityAtRight?.treecanopycover_percentage >
                                cityAtEnd?.treecanopycover_percentage
                                ? '#99c93c'
                                : 'white'
                              : '#fff'
                            : cityAtRight?.treecanopycover_percentage >
                              cityAtLeft?.treecanopycover_percentage
                              ? '#99c93c'
                              : 'white',
                        color:
                          cityAtLeft && cityAtRight && cityAtEnd
                            ? cityAtRight?.treecanopycover_percentage >
                              cityAtLeft?.treecanopycover_percentage
                              ? cityAtRight?.treecanopycover_percentage >
                                cityAtEnd?.treecanopycover_percentage
                                ? '#fff'
                                : 'black'
                              : 'black'
                            : cityAtRight?.treecanopycover_percentage >
                              cityAtLeft?.treecanopycover_percentage
                              ? '#fff'
                              : 'black',
                      }}
                    >
                      <Typography
                        style={{
                          fontWeight: 'bold',

                          marginRight: '0rem',
                        }}
                      >
                        {NumberUtils.toPercentage(
                          cityAtRight?.treecanopycover_percentage
                        )}
                      </Typography>
                    </Box>
                  )}
                  {arrow === true && (
                    <Box
                      className={rowStyle}
                      style={{
                        backgroundColor:
                          cityAtEnd?.treecanopycover_percentage >
                            cityAtLeft?.treecanopycover_percentage
                            ? cityAtEnd?.treecanopycover_percentage >
                              cityAtRight?.treecanopycover_percentage
                              ? '#99c93c'
                              : 'white'
                            : '#fff',
                        color:
                          cityAtEnd?.treecanopycover_percentage >
                            cityAtLeft?.treecanopycover_percentage
                            ? cityAtEnd?.treecanopycover_percentage >
                              cityAtRight?.treecanopycover_percentage
                              ? '#fff'
                              : 'black'
                            : 'black',
                      }}
                    >
                      <Typography
                        style={{
                          fontWeight: 'bold',

                          marginRight: '0rem',
                        }}
                      >
                        {NumberUtils.toPercentage(
                          cityAtEnd?.treecanopycover_percentage
                        )}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>

              <Box style={{ margin: '3rem auto' }}>
                <Box style={{ display: 'flex' }}>
                  <img
                    src={grassIcon}
                    alt="Percentage of urban area covered by grass"
                    width="30px"
                    height="30px"
                  />
                  <Typography
                    variant="subtitle1"
                    style={{
                      marginLeft: '10px',
                    }}
                  >
                    Percentage of urban area covered by grass
                  </Typography>
                </Box>
                <Divider className={dividerStyle} />
                <Box className={boxStyle}>
                  {arrow === false && (
                    <Box
                      className={rowStyle}
                      style={{
                        backgroundColor:
                          cityAtLeft && cityAtRight && cityAtEnd
                            ? cityAtLeft?.grasscover_percentage >
                              cityAtRight?.grasscover_percentage
                              ? cityAtLeft?.grasscover_percentage >
                                cityAtEnd?.grasscover_percentage
                                ? '#99c93c'
                                : 'white'
                              : '#fff'
                            : cityAtLeft?.grasscover_percentage >
                              cityAtRight?.grasscover_percentage
                              ? '#99c93c'
                              : 'white',
                        color:
                          cityAtLeft && cityAtRight && cityAtEnd
                            ? cityAtLeft?.grasscover_percentage >
                              cityAtRight?.grasscover_percentage
                              ? cityAtLeft?.grasscover_percentage >
                                cityAtEnd?.grasscover_percentage
                                ? '#fff'
                                : 'black'
                              : 'black'
                            : cityAtLeft?.grasscover_percentage >
                              cityAtRight?.grasscover_percentage
                              ? '#fff'
                              : 'black',
                      }}
                    >
                      <Typography
                        style={{
                          fontWeight: 'bold',

                          marginRight: '0rem',
                        }}
                      >
                        {NumberUtils.toPercentage(
                          cityAtLeft?.grasscover_percentage
                        )}
                      </Typography>
                    </Box>
                  )}
                  {(arrow === false || arrow === true) && (
                    <Box
                      style={{
                        display: 'flex',
                        borderRadius: '50px',
                        width: 'max-content',
                        padding: '7px',
                        backgroundColor:
                          cityAtLeft && cityAtRight && cityAtEnd
                            ? cityAtRight?.grasscover_percentage >
                              cityAtLeft?.grasscover_percentage
                              ? cityAtRight?.grasscover_percentage >
                                cityAtEnd?.grasscover_percentage
                                ? '#99c93c'
                                : 'white'
                              : '#fff'
                            : cityAtRight?.grasscover_percentage >
                              cityAtLeft?.grasscover_percentage
                              ? '#99c93c'
                              : 'white',
                        color:
                          cityAtLeft && cityAtRight && cityAtEnd
                            ? cityAtRight?.grasscover_percentage >
                              cityAtLeft?.grasscover_percentage
                              ? cityAtRight?.grasscover_percentage >
                                cityAtEnd?.grasscover_percentage
                                ? '#fff'
                                : 'black'
                              : 'black'
                            : cityAtRight?.grasscover_percentage >
                              cityAtLeft?.grasscover_percentage
                              ? '#fff'
                              : 'black',
                      }}
                    >
                      <Typography
                        style={{
                          fontWeight: 'bold',

                          marginRight: '0rem',
                        }}
                      >
                        {NumberUtils.toPercentage(
                          cityAtRight?.grasscover_percentage
                        )}
                      </Typography>
                    </Box>
                  )}
                  {arrow === true && (
                    <Box
                      className={rowStyle}
                      style={{
                        backgroundColor:
                          cityAtEnd?.grasscover_percentage >
                            cityAtLeft?.grasscover_percentage
                            ? cityAtEnd?.grasscover_percentage >
                              cityAtRight?.grasscover_percentage
                              ? '#99c93c'
                              : 'white'
                            : '#fff',
                        color:
                          cityAtEnd?.grasscover_percentage >
                            cityAtLeft?.grasscover_percentage
                            ? cityAtEnd?.grasscover_percentage >
                              cityAtRight?.grasscover_percentage
                              ? '#fff'
                              : 'black'
                            : 'black',
                      }}
                    >
                      <Typography
                        style={{
                          fontWeight: 'bold',

                          marginRight: '0rem',
                        }}
                      >
                        {NumberUtils.toPercentage(
                          cityAtEnd?.grasscover_percentage
                        )}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
            {cityAtEnd && arrow === false && (
              <IconButton style={{
                position: 'absolute', top: '51.5%', right: 5,
                minWidth: '40px', borderRadius: '30px', boxShadow: 'rgb(0 0 0 / 25%) 0px 0px 12px 0px'
              }}>
                <ArrowForwardIos onClick={arrowHandler} style={{ width: '16px', height: '16px' }} />
              </IconButton>
            )}
          </Box>
        </Box>
      ) : (
        <Box
          style={{
            margin: '40px',
            // display: 'flex',
            // flexDirection: 'column',
            // alignItems: 'center',
            // justifyContent: 'left'
          }}
        >
          <Typography
            variant="h5"
            style={{ margin: '2rem auto', fontWeight: 'bold' }}
          >
            Which city is greener?
          </Typography>
          <Typography variant="subtitle1" style={{}}>
            Greenness is not a competition although benchmarking cities can be a
            great learning opportunity for you to either feel proud of your
            achievements or find inspiration on how to do better.
          </Typography>
          <Typography variant="subtitle1">
            Battle two cities against each other based on their green KPI’s and
            find out who is greener.
          </Typography>
          <Typography variant="subtitle1">
            Have fun, but be nice to your opponent
          </Typography>
          <Box
            style={{
              margin: '54px 0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '60px',
            }}
          >
            <Box style={{}}>
              {cityAtLeft && (
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '0rem',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant={'h5'} style={{ fontWeight: 'bold' }}>
                    {cityAtLeft?.id}
                  </Typography>
                  <Button
                    className={redoBtn}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                    onClick={() => getCompareLink(0)}
                  >
                    <Box
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        color: '#698d29',
                      }}
                    >
                      <i
                        className="fas fa-redo-alt"
                        style={{ fontSize: '1rem' }}
                      ></i>
                      <Typography
                        variant="subtitle1"
                        style={{ margin: '0 0.5rem', fontWeight: 'bold' }}
                      >
                        Change city
                      </Typography>
                    </Box>
                  </Button>
                </Box>
              )}
              {!cityAtLeft?.id && (
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    // border: '2px solid #99c93c',
                    // borderRadius: '5px',
                    padding: '0.5rem',
                  }}
                >
                  <Box
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {/* <Typography
                      variant="subtitle1"
                      style={{ fontWeight: 'bold' }}
                    >
                      Select city 1
                    </Typography> */}
                    <Autocomplete
                      id="combo-box-demo"
                      options={
                        rightCity && endCity
                          ? citiesList.filter(
                            c => c?.id !== rightCity && c?.id !== endCity
                          )
                          : citiesList
                      }
                      getOptionLabel={(option: any) => option?.id}
                      style={{
                        width: '12rem',
                      }}
                      inputValue={leftCity}
                      filterOptions={filterOptions}
                      onInputChange={(e, v) => {
                        if (citiesIds.includes(v)) {
                          if (
                            !rightCity ||
                            !endCity ||
                            (rightCity && endCity !== v)
                          ) {
                            navigate(
                              rightCity && endCity
                                ? `/compare/?${v}_vs_${rightCity}_vs_${endCity} `
                                : `/compare/?${v}_vs_${rightCity}`
                            );
                          }
                          if (rightCity || endCity) {
                            window.scroll({
                              top: 0,
                              left: 0,
                              behavior: 'smooth',
                            });
                          }
                        }
                        setLeftCity(v);
                      }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          placeholder="Select a city"
                          variant="outlined"
                        />
                      )}
                    />
                  </Box>
                </Box>
              )}
            </Box>
            <Box
              style={{
                width: '120%',
                height: '1px',
                textAlign: 'center',
                background: '#dbd4d4',
              }}
            >
              <img
                alt="vs"
                src={vsImg}
                style={{
                  height: '6rem',
                  backgroundColor: '#fff',
                  marginTop: '-40px',
                }}
              />
            </Box>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                margin: '0rem',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {cityAtRight && (
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '0rem',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                    {cityAtRight?.id}
                  </Typography>
                  <Button
                    className={redoBtn}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                    onClick={() => getCompareLink(1)}
                  >
                    <Box
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        color: '#698d29',
                      }}
                    >
                      <i
                        className="fas fa-redo-alt"
                        style={{ fontSize: '1rem' }}
                      ></i>
                      <Typography
                        variant="subtitle1"
                        style={{ margin: '0 0.5rem', fontWeight: 'bold' }}
                      >
                        Change city
                      </Typography>
                    </Box>
                  </Button>
                </Box>
              )}
              {!cityAtRight?.id && (
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    // border: '2px solid #99c93c',
                    // borderRadius: '5px',
                    padding: '0.5rem',
                    // marginLeft: '5rem'
                  }}
                >
                  <Box>
                    {/* <Typography
                      variant="subtitle1"
                      style={{ fontWeight: 'bold' }}
                    >
                      Select city 2
                    </Typography> */}
                    <Autocomplete
                      id="combo-box-demo"
                      options={
                        leftCity || endCity
                          ? citiesList.filter(
                            c => c?.id !== leftCity && c?.id !== endCity
                          )
                          : citiesList
                        // cityAtLeft?.id
                        // 	? citiesList.filter(c => c?.id !== cityAtLeft?.id)
                        // 	: citiesList
                      }
                      getOptionLabel={(option: any) => option?.id}
                      style={{
                        width: '12rem',
                      }}
                      inputValue={rightCity}
                      filterOptions={filterOptions}
                      onInputChange={(e, v) => {
                        if (citiesIds.includes(v)) {
                          if (
                            !leftCity ||
                            !endCity ||
                            (leftCity && endCity !== v)
                          ) {
                            navigate(
                              leftCity && endCity
                                ? `/compare/?${leftCity}_vs_${v}_vs_${endCity} `
                                : `/compare/?${leftCity}_vs_${v} `
                            );
                          }
                          if (leftCity || endCity) {
                            window.scroll({
                              top: 0,
                              left: 0,
                              behavior: 'smooth',
                            });
                          }
                        }
                        setRightCity(v);
                      }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          placeholder="Select a city"
                          variant="outlined"
                        />
                      )}
                    />
                  </Box>
                </Box>
              )}
            </Box>
            {!open && (
              <Button
                variant="outlined"
                color="primary"
                disabled={leftCity && rightCity ? false : true}
                style={{
                  borderRadius: '1000px',
                  height: '76px',
                  width: '76px',
                }}
                onClick={() => setOpen(true)}
              >
                <IconButton
                  color={leftCity && rightCity ? 'primary' : 'inherit'}
                >
                  <Add />
                </IconButton>
              </Button>
            )}
            {open && (
              <>
                <Box
                  style={{
                    width: '120%',
                    height: '1px',
                    textAlign: 'center',
                    background: '#dbd4d4',
                  }}
                >
                  <img
                    alt="vs"
                    src={vsImg}
                    style={{
                      height: '6rem',
                      backgroundColor: '#fff',
                      marginTop: '-40px',
                    }}
                  />
                </Box>
                <Box style={{ paddingTop: endCity ? '0' : '0' }}>
                  {cityAtEnd && (
                    <Box
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        margin: '0rem',
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                        {cityAtEnd?.id}
                      </Typography>
                      <Button
                        className={redoBtn}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                        }}
                        onClick={() => getCompareLink(2)}
                      >
                        <Box
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            color: '#698d29',
                          }}
                        >
                          <i
                            className="fas fa-redo-alt"
                            style={{ fontSize: '1rem' }}
                          ></i>
                          <Typography
                            variant="subtitle1"
                            style={{ margin: '0 0.5rem', fontWeight: 'bold' }}
                          >
                            Change city
                          </Typography>
                        </Box>
                      </Button>
                    </Box>
                  )}
                  {!cityAtEnd?.id && (
                    <>
                      <Box
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          // border: '2px solid #99c93c',
                          // borderRadius: '5px',
                          padding: '0.5rem',
                        }}
                      >
                        <Box>
                          {/* <Typography
                          variant="subtitle1"
                          style={{ fontWeight: 'bold' }}
                        >
                          Select city 3
                        </Typography> */}
                          <Autocomplete
                            id="combo-box-demo"
                            options={
                              leftCity || rightCity
                                ? citiesList.filter(
                                  c =>
                                    c?.id !== leftCity && c?.id !== rightCity
                                )
                                : citiesList
                            }
                            getOptionLabel={(option: any) => option?.id}
                            style={{
                              width: '12rem',
                            }}
                            inputValue={endCity}
                            filterOptions={filterOptions}
                            onInputChange={(e, v) => {
                              if (citiesIds.includes(v)) {
                                if (
                                  !leftCity ||
                                  !rightCity ||
                                  (leftCity && rightCity !== v)
                                ) {
                                  navigate(
                                    leftCity && rightCity
                                      ? `/compare/?${leftCity}_vs_${rightCity}_vs_${v}`
                                      : `/compare/?_vs_${v}`
                                  );
                                }
                                if (leftCity && rightCity) {
                                  window.scroll({
                                    top: 0,
                                    left: 0,
                                    behavior: 'smooth',
                                  });
                                }
                              }
                              setEndCity(v);
                            }}
                            renderInput={params => (
                              <TextField
                                {...params}
                                placeholder="Select a city"
                                variant="outlined"
                              />
                            )}
                          />
                        </Box>
                      </Box>
                      <Button
                        className={redoBtn}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          margin: '-1rem auto',
                        }}
                      // onClick={() => getCompareLink(cityAtLeft, 1)}
                      >
                        <Box
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginTop: '1rem',
                            alignItems: 'center',
                            cursor: 'pointer',
                            color: '#698d29',
                          }}
                          onClick={() => {
                            getCompareLink(2);
                            setcityAtEnd('');
                            setOpen(false);
                          }}
                        >
                          <i
                            className="fa fa-times"
                            style={{ fontSize: '1rem' }}
                          ></i>
                          <Typography
                            variant="subtitle1"
                            style={{ margin: '0 0.5rem', fontWeight: 'bold' }}
                          >
                            Remove city
                          </Typography>
                        </Box>
                      </Button>
                    </>
                  )}
                </Box>
              </>
            )}
          </Box>
          <Button
            variant="contained"
            color="primary"
            className={redoBtn}
            style={{
              display:
                (open === true && endCity && leftCity && rightCity) ||
                  (open === false && rightCity && leftCity)
                  ? 'flex'
                  : 'none',
              flexDirection: 'row',
              color: '#fff',
              fontWeight: 'bold',
              margin: '0px auto',
            }}
            onClick={onCompareCity}
          >
            Compare selected cities
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SmallCompare;