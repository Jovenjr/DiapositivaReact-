import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heading, Text, FlexBox, Box } from 'spectacle';
import { FaCircle } from 'react-icons/fa';

interface TimelineItemProps {
  hitoStr: string;
  isActive: boolean;
  slideNumber: number;
  index: number;
  previousYearStr?: string; // Año del hito anterior para comparación
  typingSpeed?: number; // Milisegundos por caracter
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  hitoStr,
  isActive,
  slideNumber,
  index,
  previousYearStr,
  typingSpeed = 50, // Velocidad por defecto
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const itemRef = useRef<HTMLDivElement>(null); // Ref para el scrollIntoView

  // --- Lógica para extraer datos del hito (movida aquí) ---
  const yearMatch = hitoStr.match(/^(\d{4})/);
  const year = yearMatch ? yearMatch[1] : '';

  const previousYearMatch = previousYearStr?.match(/^(\d{4})/);
  const previousYear = previousYearMatch ? previousYearMatch[1] : '';
  const showYearTextInactive = year !== previousYear;

  const matchLey = hitoStr.match(/^(Ley|Decreto|Comité|Constitución|IPAC|OGP|DIGEIG|Plan|NORTIC|SAIP|Política|Indicadores|Gabinete|CPTA)\s*([\w\-]+)?/i);
  const tipoHito = matchLey ? matchLey[1] : '';
  const numeroHito = matchLey ? matchLey[2] : '';
  let textoPrincipal = hitoStr;
  if (yearMatch) {
    textoPrincipal = textoPrincipal.substring(yearMatch[0].length).trim();
     if (textoPrincipal.startsWith(':')) {
         textoPrincipal = textoPrincipal.substring(1).trim();
     }
  }
  const textoLey = matchLey ? `${tipoHito}${numeroHito ? ' ' + numeroHito : ''}` : '';
  if (matchLey && textoPrincipal.toLowerCase().startsWith(textoLey.toLowerCase())) {
    textoPrincipal = textoPrincipal.substring(textoLey.length).trim();
  }
  // --- Fin lógica extracción ---

  // Efecto para el scroll
  useEffect(() => {
    if (isActive && itemRef.current) {
      itemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
    }
  }, [isActive]);

  // Efecto para la animación de escritura
  useEffect(() => {
    // Limpiar intervalo anterior al cambiar isActive o textoPrincipal
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setDisplayedText(''); // Resetear texto al cambiar

    if (isActive) {
      let charIndex = 0;
      intervalRef.current = setInterval(() => {
        if (charIndex < textoPrincipal.length) {
          const charToAdd = textoPrincipal[charIndex];
          if (charToAdd !== undefined) {
            setDisplayedText((prev) => prev + charToAdd);
          } else {
            console.error('Typing effect tried to add undefined character at index:', charIndex);
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
          }
          charIndex++;
        } else {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      }, typingSpeed);
    } else {
       // Si no está activo, mostrar el texto completo inmediatamente
       setDisplayedText(textoPrincipal);
    }

    // Función de limpieza
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, textoPrincipal, typingSpeed]); // Dependencias clave

  return (
    <motion.div
      ref={itemRef} // Añadir ref aquí
      key={index}
      id={`hito-${slideNumber}-${index}`}
      initial={{ opacity: 0.3, y: 10 }}
      animate={{ opacity: isActive ? 1 : 0.3, y: isActive ? 0 : 10 }}
      transition={{ duration: 0.5 }}
      style={{
        marginBottom: '30px',
        borderLeft: `5px solid ${isActive ? '#0d47a1' : '#1976d2'}`,
      }}
    >
      {isActive ? (
        <Box maxWidth="40%" paddingLeft='20px'>
          <Heading fontFamily="Poppins" fontWeight="bold" fontSize="88px" color="#0d47a1" margin="0" lineHeight="1">
            {year}
          </Heading>
          <Box height="6px" width="120px" backgroundColor="#0d47a1" margin="6px 0 14px 0" />
          {textoLey && (
            <Text fontFamily="Poppins" fontStyle="italic" fontSize="40px" color="#555" margin="0 0 8px 0" lineHeight="1">
              {textoLey}
            </Text>
          )}
          {/* Renderizar el texto que se está escribiendo */}
          <Text as="div" fontFamily="Poppins" fontWeight="bold" fontSize="40px" color="#000" margin="0" lineHeight="1.1" style={{ minHeight: '53px' /* Ajustar si es necesario para evitar saltos */ }}>
            {displayedText}
            <span 
              style={{
                display: 'inline-block',
                width: '2px', // Ancho del cursor
                height: '1em', // Altura relativa a la fuente
                backgroundColor: 'currentColor', // Color del cursor (igual al texto)
                marginLeft: '2px', // Pequeño espacio antes del cursor
                opacity: intervalRef.current ? 1 : 0, // Desaparece cuando intervalRef es null
                verticalAlign: 'baseline' // Alinear con la línea base del texto
              }}
            ></span> {/* Span vacío estilizado */}
          </Text>
        </Box>
      ) : (
        <FlexBox alignItems="center" paddingLeft='20px'>
          <FaCircle size="15px" color="#1976d2" style={{ marginRight: '15px', flexShrink: 0 }} />
          {showYearTextInactive && (
            <Text fontFamily="Poppins" fontSize="24px" color="#1976d2" margin="0" lineHeight="1.2" fontWeight="bold">
              {year}
            </Text>
          )}
        </FlexBox>
      )}
    </motion.div>
  );
};
