  // Fonction pour générer le PDF complet du cours
  const generatePdf = async () => {
    if (!courseModule) return;

    setIsGeneratingPdf(true);

    try {
      // Importer dynamiquement jsPDF et html2canvas uniquement côté client
      const { jsPDF } = await import('jspdf');
      const html2canvas = (await import('html2canvas')).default;

      // Créer le contenu HTML complet du cours
      const content = document.createElement('div');
      content.style.padding = '30px';
      content.style.fontFamily = 'Arial, sans-serif';
      content.style.maxWidth = '800px';
      content.style.margin = '0 auto';
      content.style.color = '#2d3748';
      content.style.lineHeight = '1.6';

      // Contenu du PDF avec toutes les sections détaillées
      content.innerHTML = `
        <!-- En-tête du cours -->
        <div style="text-align: center; margin-bottom: 40px; border-bottom: 3px solid #4a5568; padding-bottom: 30px;">
          <h1 style="color: #2d3748; margin-bottom: 15px; font-size: 28px; font-weight: bold;">${courseModule.title}</h1>
          <p style="color: #4a5568; font-style: italic; font-size: 18px; margin-bottom: 20px;">${courseModule.description}</p>
          <div style="display: flex; justify-content: center; gap: 30px; margin-top: 20px; color: #718096; font-size: 14px;">
            <div><strong>Niveau:</strong> ${courseModule.level}</div>
            <div><strong>Durée:</strong> ${courseModule.duration}</div>
            <div><strong>Formatrice:</strong> Ia-Solution RDC</div>
          </div>
        </div>

        <!-- Prérequis -->
        ${courseModule.prerequisites ? `
          <div style="margin-bottom: 40px; padding: 20px; background-color: #f7fafc; border-left: 4px solid #3182ce; border-radius: 6px;">
            <h2 style="color: #2d3748; margin-bottom: 15px; font-size: 20px; display: flex; align-items: center;">
              📋 Prérequis
            </h2>
            <ul style="padding-left: 20px; color: #4a5568; font-size: 14px;">
              ${courseModule.prerequisites.map(prereq => `<li style="margin-bottom: 8px;">${prereq}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        <!-- Objectifs d'apprentissage -->
        <div style="margin-bottom: 40px;">
          <h2 style="color: #2d3748; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 20px; font-size: 22px; display: flex; align-items: center;">
            🎯 Objectifs d'apprentissage
          </h2>
          <ul style="padding-left: 20px; color: #4a5568; font-size: 14px; line-height: 1.8;">
            ${courseModule.objectives.map(obj => `<li style="margin-bottom: 12px; padding-left: 15px; position: relative;">${obj}</li>`).join('')}
          </ul>
        </div>

        <!-- Sections du cours -->
        ${courseModule.sections?.map((section, index) => `
          <div style="margin-bottom: 50px; page-break-inside: avoid;">
            <!-- En-tête de section -->
            <div style="margin-bottom: 25px; padding: 15px; background-color: #edf2f7; border-radius: 8px; border-left: 4px solid #4a5568;">
              <h3 style="color: #2d3748; margin: 0; font-size: 18px; font-weight: bold; display: flex; align-items: center; gap: 10px;">
                📖 Section ${index + 1}: ${section.title}
              </h3>
              ${section.estimatedTime ? `<p style="color: #718096; margin: 5px 0 0 0; font-size: 12px;">⏱️ Temps estimé: ${section.estimatedTime}</p>` : ''}
            </div>

            <!-- Contenu de la section -->
            <div style="color: #4a5568; font-size: 14px; line-height: 1.7; margin-bottom: 30px;">
              ${section.content}
            </div>

            <!-- Exemples de code -->
            ${section.codeExamples?.map(example => `
              <div style="margin-bottom: 25px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #2d3748; color: white; padding: 12px 15px; font-size: 13px; font-weight: bold;">
                  💻 ${example.title}
                </div>
                <div style="background-color: #f7fafc; padding: 15px; border-left: 4px solid #3182ce;">
                  <p style="margin: 0 0 15px 0; font-style: italic; color: #4a5568;">${example.description}</p>
                  <pre style="background-color: #1a202c; color: #e2e8f0; padding: 15px; border-radius: 6px; overflow-x: auto; font-family: 'Courier New', monospace; font-size: 12px; white-space: pre-wrap; margin: 0;">
${example.code}
                  </pre>
                  ${example.explanation ? `
                    <div style="margin-top: 15px; padding: 12px; background-color: #edf2f7; border-radius: 6px;">
                      <strong>💡 Explication:</strong> ${example.explanation}
                    </div>
                  ` : ''}
                </div>
              </div>
            `).join('') || ''}

            <!-- Exercices -->
            ${section.exercises?.map(exercise => `
              <div style="margin-bottom: 25px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #2d3748; color: white; padding: 12px 15px; font-size: 13px; font-weight: bold;">
                  🧠 Exercice ${exercise.id} - ${exercise.title}
                </div>
                <div style="background-color: #f7fafc; padding: 15px;">
                  <p style="margin: 0 0 15px 0; color: #4a5568;"><strong>Description:</strong> ${exercise.description}</p>
                  <p style="margin: 0 0 10px 0; color: #4a5568;"><strong>Difficulté:</strong>
                    <span style="padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: bold; margin-left: 5px;
                      ${exercise.difficulty === 'facile' ? 'background-color: #c6f6d5; color: #22543d;' :
                        exercise.difficulty === 'moyen' ? 'background-color: #fed7d7; color: #742a2a;' :
                        'background-color: #fbb6ce; color: #702459;'}">
                      ${exercise.difficulty.toUpperCase()}
                    </span>
                  </p>
                  ${exercise.solution ? `
                    <details style="margin-top: 10px;">
                      <summary style="cursor: pointer; color: #3182ce; font-weight: bold; margin-bottom: 10px;">Voir la solution</summary>
                      <pre style="background-color: #1a202c; color: #e2e8f0; padding: 15px; border-radius: 6px; overflow-x: auto; font-family: 'Courier New', monospace; font-size: 12px; white-space: pre-wrap; margin: 0;">
${exercise.solution}
                      </pre>
                    </details>
                  ` : ''}
                </div>
              </div>
            `).join('') || ''}
          </div>
        `).join('') || ''}

        <!-- Projet final -->
        ${courseModule.finalProject ? `
          <div style="margin-bottom: 40px; padding: 25px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px;">
            <h2 style="color: white; margin-bottom: 20px; font-size: 24px; text-align: center;">🚀 Projet Final</h2>
            <h3 style="color: white; margin-bottom: 15px; font-size: 20px;">${courseModule.finalProject.title}</h3>
            <p style="margin-bottom: 20px; font-size: 16px; opacity: 0.9;">${courseModule.finalProject.description}</p>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
              <div>
                <h4 style="color: white; margin-bottom: 10px; font-size: 16px;">📋 Exigences</h4>
                <ul style="opacity: 0.9; font-size: 14px;">
                  ${courseModule.finalProject.requirements.map(req => `<li style="margin-bottom: 5px;">${req}</li>`).join('')}
                </ul>
              </div>
              <div>
                <h4 style="color: white; margin-bottom: 10px; font-size: 16px;">📦 Livrables</h4>
                <ul style="opacity: 0.9; font-size: 14px;">
                  ${courseModule.finalProject.deliverables.map(del => `<li style="margin-bottom: 5px;">${del}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Ressources supplémentaires -->
        ${courseModule.resources?.length ? `
          <div style="margin-bottom: 40px;">
            <h2 style="color: #2d3748; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 20px; font-size: 20px; display: flex; align-items: center;">
              🔗 Ressources supplémentaires
            </h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
              ${courseModule.resources.map(resource => `
                <div style="padding: 15px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #f7fafc;">
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                    <span style="font-size: 16px;">
                      ${resource.type === 'article' ? '📄' : resource.type === 'video' ? '🎥' : resource.type === 'documentation' ? '📚' : '📊'}
                    </span>
                    <span style="font-weight: bold; color: #2d3748; font-size: 14px;">${resource.title}</span>
                  </div>
                  <p style="color: #4a5568; font-size: 12px; margin: 0;">Type: ${resource.type}</p>
                  <a href="${resource.url}" style="color: #3182ce; text-decoration: none; font-size: 12px; display: block; margin-top: 5px;" target="_blank">
                    🔗 Voir la ressource →
                  </a>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Pied de page -->
        <div style="margin-top: 60px; padding-top: 30px; border-top: 3px solid #4a5568; color: #718096; font-size: 12px; text-align: center;">
          <p style="margin-bottom: 10px;"><strong>Formation ${courseModule.title}</strong></p>
          <p style="margin-bottom: 5px;">Plateforme Ia-Solution RDC</p>
          <p style="margin-bottom: 5px;">Généré le ${new Date().toLocaleDateString('fr-FR')}</p>
          <p>Tous droits réservés © ${new Date().getFullYear()}</p>
        </div>
      `;

      // Créer un conteneur temporaire pour le contenu du PDF
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.style.width = '800px';
      container.appendChild(content);
      document.body.appendChild(container);

      try {
        // Générer le canvas avec html2canvas
        const canvas = await html2canvas(content, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          width: 800,
          height: content.scrollHeight
        });

        // Créer le PDF avec gestion des pages
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        // Si le contenu est plus grand qu'une page, créer plusieurs pages
        if (pdfHeight > pdf.internal.pageSize.getHeight()) {
          const totalPages = Math.ceil(pdfHeight / pdf.internal.pageSize.getHeight());

          for (let page = 0; page < totalPages; page++) {
            if (page > 0) {
              pdf.addPage();
            }

            const yOffset = (page * pdf.internal.pageSize.getHeight() * imgProps.width) / pdfWidth;
            const remainingHeight = Math.min(
              pdf.internal.pageSize.getHeight() * imgProps.width / pdfWidth,
              imgProps.height - yOffset
            );

            pdf.addImage(
              imgData,
              'PNG',
              0,
              -yOffset,
              pdfWidth,
              (remainingHeight * pdfWidth) / imgProps.width
            );
          }
        } else {
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        }

        // Télécharger le PDF
        pdf.save(`cours-complet-${courseModule.slug}.pdf`);

      } catch (error) {
        console.error("Erreur lors de la génération du PDF:", error);
        alert("Une erreur est survenue lors de la génération du PDF.");
      } finally {
        // Nettoyer
        if (document.body.contains(container)) {
          document.body.removeChild(container);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      alert("Une erreur est survenue lors de la génération du PDF.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };
