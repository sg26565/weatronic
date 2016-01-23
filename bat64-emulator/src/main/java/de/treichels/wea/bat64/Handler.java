package de.treichels.wea.bat64;

import java.io.IOException;
import java.io.InputStream;
import java.io.Reader;
import java.io.StringReader;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;

import javax.json.Json;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

@Path("/")
public class Handler {
	@POST
	@Path("/cgi/{method}")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON)
	public JsonObject handleCGI(@PathParam("method") final String method, final String body) {

		final Reader stringReader = new StringReader(body);
		final JsonReader jsonReader = Json.createReader(stringReader);
		final JsonObject jsonObject = jsonReader.readObject();
		System.out.printf("%s: %s\n", method, jsonObject);

		final Map<String, String> config = new HashMap<String, String>();
		final JsonBuilderFactory factory = Json.createBuilderFactory(config);
		final JsonObject result = factory.createObjectBuilder()
		        .add("Telemetry_Val",
		                factory.createArrayBuilder()
		                        .add(factory.createObjectBuilder().add("ID", "11398").add("Value", "802976").add("ID", "33968").add("Value",
		                                factory.createObjectBuilder().add("RemPowerTime", "08h:35m").add("InputVoltage", 0).add("IsReserve", 0)
		                                        .add("IsRunOnDc", 0).add("MainVoltage", 4018).add("ReserveVoltage", 4190).add("Voltage", 4018)
		                                        .add("Cells", factory.createArrayBuilder().

		add(factory.createObjectBuilder().add("Capacity", "3.00Ah").add("Status", "0x0010F100").add("Temperature", "+24\u00B0C").add("Voltage", 4018)
		        .add("VoltageStr", "4.018V"))
		                                                .add(factory.createObjectBuilder().add("Capacity", "3.00Ah").add("Status", "0x0010F100")
		                                                        .add("Temperature", "+24\u00B0C").add("Voltage", 4018).add("VoltageStr", "4.018V"))
		                                                .add(factory.createObjectBuilder().add("Capacity", "3.00Ah").add("Status", "0x0010F100")
		                                                        .add("Temperature", "+24\u00B0C").add("Voltage", 4018).add("VoltageStr", "4.018V"))
		                                                .add(factory.createObjectBuilder().add("Capacity", "3.00Ah").add("Status", "0x0014F110")
		                                                        .add("Temperature", "+24\u00B0C").add("Voltage", 4018).add("VoltageStr", "4.018V"))))))
		        .build();
		System.out.printf("%s: %s\n", method, result);

		return result;
	}

	@GET
	public Response handleRedirect() throws URISyntaxException {
		System.out.println("<redirect>");
		return Response.temporaryRedirect(new URI("0.0__WelcomeScreen.html")).build();
	}

	@GET
	@Path("/{path:.+}")
	public Response handleStaticContent(@PathParam("path") final String path) throws IOException, URISyntaxException {
		System.out.println(path);

		final InputStream is = Handler.class.getClassLoader().getResourceAsStream("www/" + path);
		if (is == null) {
			return Response.status(Status.NOT_FOUND).entity(path).build();
		}

		return Response.ok(is).build();
	}
}
