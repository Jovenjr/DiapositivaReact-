import React from 'react';
import {
  Deck,
  Slide,
  Box,
  Stepper
} from 'spectacle';
import { theme } from './theme';
import { TimelineItem } from './TimelineItem';

// Datos de la presentación (obtenidos del JSON anterior)
const presentationData = {
  "presentationMetadata": {
    "mainTitle": "Acceso a la Información y Transparencia en tiempos de la Inteligencia Artificial",
    "mainSubtitle": "Línea de Tiempo",
    "topic": "Evolución del acceso a la información y la transparencia pública en República Dominicana con énfasis en la IA."
  },
  "slides": [
    {
      "slideNumber": 1,
      "type": "Portada",
      "content": {
        "title": "Acceso a la Información y Transparencia en tiempos de la Inteligencia Artificial"
      }
    },
    {
      "slideNumber": 2,
      "type": "LineaTiempo_Bloque",
      "content": {
        "blockTitle": "Línea de Tiempo: Transparencia en RD",
        "yearRange": "2004–2025",
        "hitos": [
          "2004  Ley 200-04 de Acceso a la Información Pública",
          "2005  Decreto 130-05: Reglamento para aplicar la Ley 200-04",
          "2006  Creación del Comité Interinstitucional de Implementación",
          "2010  Nueva Constitución + Lanzamiento de la IPAC",
          "2011  Adhesión de RD a la Alianza para el Gobierno Abierto (OGP)",
          "2012  Nace la DIGEIG y se presenta el 1.er Plan de Acción OGP",
          "2013  Estandarización de Sub-Portales de Transparencia (NORTIC A2)",
          "2014  2.º Plan de Acción OGP y apertura del Portal de Datos Abiertos",
          "2015  Lanzamiento del SISMAP-Municipal para monitorear gobiernos locales",
          "2016  SAIP, Portal de Datos Abiertos, Transparencia Fiscal y 3.er Plan OGP",
          "2017  Inicio de la Política Nacional de Datos Abiertos + Portal Transaccional de Compras",
          "2018  Indicadores de Transparencia Gubernamental y 4.º Plan OGP",
          "2020  Creación del Gabinete de Transparencia, Prevención y Control del Gasto",
          "2021  Decreto 713-21: principios de Gobierno Abierto y Foro Multiactor",
          "2022  Política Nacional de Datos Abiertos y 5.º Plan de Acción OGP (2022-2024)",
          "2023  Transparencia obligatoria en portales de gobernaciones + Decreto 8-23",
          "2024  6.º Plan de Acción OGP (2024-2028) con enfoque en IA y plataformas digitales",
          "2025  Decreto 76-25: Comisión Presidencial de Transparencia y Anticorrupción"
        ],
        "images": [
          "/images/2004.jpg",
          "/images/2005.jpg",
          "/images/2006.jpg",
          "/images/2010.jpg",
          "/images/2011.jpg",
          "/images/2012.jpg",
          "/images/2013.jpg",
          "/images/2014.jpg",
          "/images/2015.jpg",
          "/images/2016.jpg",
          "/images/2017.jpg",
          "/images/2018.jpg",
          "/images/2020.jpg",
          "/images/2021.jpg",
          "/images/2022.jpg",
          "/images/2023.jpg",
          "/images/2024.jpg",
          "/images/2025.jpg"
        ],
        "imagePositions": [
          "center 1%",
          "center 1%",
          "center 3%",
          "center 7%",
          "center 18%",
          "center 24%",
          "center 28%",
          "center 37%",
          "center 44%",
          "center 50%",
          "center 56%",
          "center 63%",
          "center 70%",
          "center 77%",
          "center 84%",
          "center 87%",
          "center 94%",
          "center 92%"
        ]
      },
      "visuals": {
        "imageSuggestion": "Icono de línea de tiempo evolutiva"
      }
    },
    {
      "slideNumber": 3,
      "type": "Cierre",
      "content": {
        "centralText": "La transparencia se adapta a los tiempos: de leyes y decretos a inteligencia artificial y datos abiertos, construyendo un futuro de participación ciudadana real y efectiva.",
        "conclusion": "El reto es garantizar que las nuevas tecnologías, como la IA, sean aliadas de la transparencia, y no obstáculos."
      },
      "visuals": {
        "imageSuggestion": "Un candado abierto con circuitos digitales"
      }
    },
    {
      "slideNumber": 4,
      "type": "Contacto",
      "content": {}
    }
  ]
};

const App: React.FC = () => {
  return (
    <Deck theme={theme}>
      {presentationData.slides.map((slide, index) => {
        console.log(`[Slide Map] Index: ${index}, Type: ${slide?.type}, Slide Object:`, slide);
        switch (slide?.type) {
          case 'Portada':
            return (
              <Slide
                key={`slide-${slide.slideNumber}`}
                backgroundImage="url(/images/PORTADA.jpg)"
                backgroundSize="cover"
                backgroundPosition="center center"
                backgroundColor="#000"
              >
                <Box 
                  position="absolute"
                  top={0}
                  left={0}
                  width="100%"
                  height="100%"
                />
              </Slide>
            );
          case 'LineaTiempo_Bloque':
            return (
              <Slide 
                key={`slide-${slide.slideNumber}`}
                backgroundColor={theme.colors.background}
                padding={0} 
              >
                <Box 
                  position="relative" 
                  width="100%" 
                  height="100%" 
                  margin={0}
                  backgroundColor={theme.colors.background}
                >
                   {/* Mover AnimatePresence y la imagen DENTRO del Stepper */}
                   {/* El contenido del Stepper ahora envuelve la imagen */}
                   <Stepper values={slide.content.hitos || []}>
                     {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
                     {(_value, step) => {
                       // Obtener la imagen y la posición correspondientes al paso actual
                       const currentImage = slide.content.images?.[step];
                       const currentPosition = slide.content.imagePositions?.[step] || 'center 50%';

                       return (
                          <Box
                            position="relative"
                            width="100%"
                            height="100%"
                            style={{
                              backgroundImage: currentImage ? `url(${currentImage})` : 'none',
                              backgroundColor: theme.colors.background,
                              backgroundSize: 'contain',
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: currentPosition,
                            }}
                          >
                            {/* Contenido del texto del hito (encima de la imagen) */}
                            <Box
                              position="relative"
                              zIndex={1} // Asegura que el texto esté sobre la imagen
                              width="100%"
                              height="100%"
                              overflowY="auto"
                              padding="0"
                            >
                              <Box 
                                position="relative" 
                                width="100%" 
                                padding="40px 60px 200px 60px"
                              >
                                {(slide.content.hitos || []).map((hito, index) => {
                                  const isActive = index === step;
                                  const previousHitoStr = index > 0 ? String(slide.content.hitos?.[index - 1]) : undefined;
                                  return (
                                    <TimelineItem
                                      key={index}
                                      hitoStr={String(hito)}
                                      isActive={isActive}
                                      slideNumber={slide.slideNumber}
                                      index={index}
                                      previousYearStr={previousHitoStr}
                                    />
                                  );
                                })}
                              </Box>
                            </Box>
                          </Box>
                       );
                     }}
                   </Stepper>
                </Box>
              </Slide>
            );
          case 'Cierre':
            return (
              <Slide 
                key={`slide-${slide.slideNumber}`} 
                backgroundImage="url(/images/Sifras.jpg)"
                backgroundSize="cover"
                backgroundPosition="center center"
                backgroundColor="#000"
                children={null}
              >
                {/* Contenido eliminado */}
              </Slide>
            );
          case 'Contacto':
            return (
              <Slide
                key={`slide-${slide.slideNumber}`}
                backgroundImage="url(/images/Contacto.jpg)"
                backgroundSize="cover"
                backgroundPosition="center center"
                backgroundColor="#f9f1ec"
                children={null}
              >
                {/* Solo imagen de fondo */}
              </Slide>
            );
          default:
            console.warn(`[Slide Map] Default case hit! Index: ${index}, Slide Object:`, slide);
            return null;
        }
      }).filter(Boolean)}
    </Deck>
  );
};

export default App;
