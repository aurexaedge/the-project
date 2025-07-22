'use client';
import Premium from '@/components/Cards/Premium/Premium';
import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import NinSlip from '@/components/Cards/NinSlip/NinSlip';
import Standard from '@/components/Cards/Standard/Standard';
import CardWrapper from '@/components/Cards/CardWrapper/CardWrapper';

export default function Card({
  userInfo,
  cardType,
  setIsCardPaymentMade,
  triggerDownload,
}) {
  const cardRef = useRef(null);

  const handleDownload = async () => {
    const element = cardRef.current;

    // Scale to A4 size
    const canvas = await html2canvas(element, {
      scale: 2, // Increase scale for higher resolution
    });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'portrait', // Set A4 orientation
      unit: 'px',
      format: 'a4', // A4 size format
    });

    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    // pdf.save('PremiumCard.pdf');
    pdf.save(
      cardType === 'Print Nin regular slip'
        ? `RegularSlip_${userInfo?.nin}.pdf`
        : cardType === 'Print Nin standard card'
        ? `StandardCard_${userInfo?.nin}.pdf`
        : cardType === 'Print Nin premium card'
        ? `PremiumCard_${userInfo?.nin}.pdf`
        : 'invalidRecord.pdf'
    );
  };
  if (triggerDownload && triggerDownload.current !== handleDownload) {
    triggerDownload.current = handleDownload;
  }
  return (
    <>
      <div
        ref={cardRef}
        style={{
          width: '794px',
          height: 'auto',
          //   position: 'absolute',
          //   left: '-9999px',
          //   visibility: 'hidden',
        }}
      >
        <CardWrapper>
          {cardType === 'Print Nin regular slip' ? (
            <NinSlip userInfo={userInfo} />
          ) : cardType === 'Print Nin standard card' ? (
            <Standard userInfo={userInfo} />
          ) : cardType === 'Print Nin premium card' ? (
            <Premium userInfo={userInfo} />
          ) : (
            ''
          )}
          {/* <Premium userInfo={ninData} /> */}
        </CardWrapper>
      </div>
      <button onClick={handleDownload}>Download</button>
    </>
  );
}
