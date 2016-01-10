@XmlJavaTypeAdapters({ @XmlJavaTypeAdapter(ShortAdapter.class), @XmlJavaTypeAdapter(StringAdapter.class) })
package de.treichels.wea.bat64.config.controlsurfaces;

import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapters;

import de.treichels.wea.bat64.config.adapters.ShortAdapter;
import de.treichels.wea.bat64.config.adapters.StringAdapter;
